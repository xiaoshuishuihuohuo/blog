#coding: utf-8
from flask import (Flask, request, session, g, redirect, url_for, render_template,Blueprint,send_from_directory,current_app,abort,jsonify)
from . import article
from ..article.forms import CommentForm, LikeForm
from flask_login import login_required, current_user
from .. import logger, db, redis
from ..models import Article_Comment, Article, Like, Article_Classification
import json, uuid
from markupsafe import escape



@article.route('/<article_id>')
def show_article(article_id):
    query = db.session.query(Article).filter(db.and_(Article.id==article_id, Article.visibility==1))
    article = query.scalar()
    if not article:
        abort(404)
    try:
        pageviews = int(redis.zincrby('pageviews', article_id))
    except Exception as e:
        logger.debug(e)
        pageviews = 0
    article.set_classification_obj()
    article.pageviews = pageviews
    comment_count = db.session.query(db.func.count(Article_Comment.id))\
        .filter(db.and_(Article_Comment.article_id==article_id, Article_Comment.is_del==0)).scalar()
    like_count = redis.scard('like_article'+':'+article_id)
    if not current_user.is_anonymous:
        is_like = redis.sismember('like_article'+':'+article_id, current_user.id)
    else:
        is_like = False
    return render_template('article.html',article=article,comment_count=comment_count,is_like=is_like,like_count=like_count)


@article.route('/<article_id>/edit')
@login_required
def edit_article(article_id):
    article = db.session.query(Article).filter(Article.id==article_id).scalar()
    #user id not nickname
    if article.author != current_user.nickname:
        abort(403)
    if not article:
        abort(404)
    #posted
    if article.visibility:
        title = article.title
        content = article.content
    else:
        title = article.ms_title
        content = article.manuscript
    classifications = db.session.query(Article_Classification).all()
    return render_template('write.html',title=title,content=content,id=article_id,classifications=classifications,selected=article.classification.split(','))


@article.route('/<article_id>/delete')
@login_required
def delete_article(article_id):
    try:
        is_success = db.session.query(Article).filter(Article.id==article_id, Article.author==current_user.nickname).delete()
        if is_success:
            db.session.query(Article_Comment).filter(Article_Comment.article_id==article_id).delete()
            db.session.commit()
            pipe = redis.pipeline()
            pipe.multi()
            pipe.hdel('articles', article_id)
            pipe.srem('pagevies', article_id)
            pipe.execute()
    except Exception as e:
        db.session.rollback()
        logger.debug(e)
        abort(500)
    if not is_success:
        abort(403)
    return redirect(url_for('main.main_page'))


@article.route('/comment', methods=['POST'])
@login_required
def comment():
    form = CommentForm()
    if not form.validate_on_submit():
        abort(400)
    comment = Article_Comment()
    comment.article_id = form.article_id.data
    comment.content = escape(form.content.data)
    comment.is_reply = form.is_reply.data
    comment.reply_to = form.reply_to.data
    comment.id = str(uuid.uuid1()).replace('-', '')
    comment.author_id = current_user.id
    try:
        db.session.add(comment)
        db.session.commit()
    except Exception, e:
        logger.debug(e)
        db.session.rollback()
        return json.dumps({'result':False})
    return json.dumps({'result':True})


@article.route('/getComments', methods=['POST'])
def get_comments():
    article_id = request.form.get('article_id')
    limit = int(request.form.get('limit'))
    offset = int(request.form.get('offset'))
    total = db.session.query(Article_Comment).\
        filter(Article_Comment.article_id == article_id).count()
    comments = db.session.query(Article_Comment).\
        filter(Article_Comment.article_id == article_id)\
        .order_by(Article_Comment.create_time).slice(offset, offset+limit)
    return jsonify({'comments':[c.to_json() for c in comments], 'total':total})


@article.route('/getTalks', methods=['POST'])
def get_talks():
    comment_id = request.form.get('comment_id')
    limit = int(request.form.get('limit'))
    offset = int(request.form.get('offset'))
    talk_ids = db.session.query(db.func.getTalks(comment_id)).scalar()
    talks = db.session.query(Article_Comment).filter(Article_Comment.id.in_(talk_ids.split(','))).order_by(Article_Comment.create_time).slice(offset, offset+limit)
    return jsonify([t.to_json() for t in talks])


@article.route('/likeComment', methods=['POST'])
@login_required
def like_comment():
    # '''like type 1 comment'''
    #idempotent幂等
    form = LikeForm()
    if not form.validate_on_submit():
        abort(400)
    try:
        if redis.sismember('like_comment'+':'+form.like_id.data, current_user.id):
            redis.sadd('like_comment'+':'+form.like_id.data, current_user.id)
            return jsonify({'result':'success'})
        else:
            redis.srem('like_comment'+':'+form.like_id.data, current_user.id)
            return jsonify({'result':'liked'})
    except Exception:
        return jsonify({'result':'error'})


@article.route('/likeArticle', methods=['POST'])
@login_required
def like_article():
    '''like type 0 article'''
    form = LikeForm()
    if not form.validate_on_submit():
        abort(400)
    try:
        if not redis.sismember('like_article'+':'+form.like_id.data, current_user.id):
            redis.sadd('like_article'+':'+form.like_id.data, current_user.id)
            return jsonify({'result':'like'})
        else:
            redis.srem('like_article'+':'+form.like_id.data, current_user.id)
            return jsonify({'result':'dislike'})
    except Exception:
        return jsonify({'result':'error'})
    
