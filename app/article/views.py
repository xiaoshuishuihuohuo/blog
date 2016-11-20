from flask import (Flask, request, session, g, redirect, url_for, render_template,Blueprint,send_from_directory,current_app,abort,jsonify)
from . import article
from ..article.forms import CommentForm, LikeForm
from flask_login import login_required, current_user
from .. import logger, db
from ..models import Article_Comment, Article, Like
import json, uuid
from markupsafe import escape



@article.route('/<article_id>')
def show_article(article_id):
    query = db.session.query(Article).filter(db.and_(Article.id==article_id, Article.visibility==1))
    try:
        query.update({Article.pageviews: Article.pageviews + 1})
        db.session.commit()
    except Exception, e:
        logger.debug(e)
        db.session.rollback()
    article = query.scalar()
    logger.debug(article)
    if not article:
        abort(404)
    comment_count = db.session.query(db.func.count(Article_Comment.id))\
        .filter(db.and_(Article_Comment.article_id==article_id, Article_Comment.is_del==0)).scalar()
    return render_template('article.html',article=article,comment_count=comment_count)


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
    comments = db.session.query(Article_Comment).\
        filter(Article_Comment.article_id == article_id)\
        .order_by(Article_Comment.create_time).slice(offset, offset+limit)
    return jsonify([c.to_json() for c in comments])


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
    '''like type 1 comment'''
    form = LikeForm()
    if not form.validate_on_submit():
        abort(400)
    is_liked = db.session.query(db.session.query(Like).filter(Like.like_type==0, Like.user_id==current_user.id, Like.like_id==form.like_id.data).exist()).scalar()
    if is_liked:
        return jsonify({'result':'liked'})
    like = Like()
    like.user_id = current_user.id
    like.like_id = form.like_id.data 
    like.like_type = 1
    try:
        db.session.query(Article_Comment).filter(db.and_(Article_Comment.id==like.like_id, Article_Comment.is_del==0)).update({Article_Comment.like_count: Article_Comment.like_count + 1})
        db.session.add(like)
        db.session.commit()
    except Exception:
        db.session.rollback()
        return jsonify({'result':'error'})
    return jsonify({'result':'success'})


@article.route('/likeArticle', methods=['POST'])
@login_required
def like_article():
    '''like type 0 article'''
    form = LikeForm()
    if not form.validate_on_submit():
        abort(400)
    is_liked = db.session.query(db.session.query(Like).filter(Like.like_type==0, Like.user_id==current_user.id, Like.like_id==form.like_id.data).exist()).scalar()
    if is_liked:
        return jsonify({'result':'liked'})
    like = Like()
    like.user_id = current_user.id
    like.like_id = form.like_id.data 
    like.like_type = 0
    try:
        db.session.query(Article).filter(db.and_(Article.id==like.like_id, Article.visibility==1)).update({Article.like_count: Article.like_count + 1})
        db.session.add(like)
        db.session.commit()
    except Exception:
        db.session.rollback()
        return jsonify({'result':'error'})
    return jsonify({'result':'success'})
