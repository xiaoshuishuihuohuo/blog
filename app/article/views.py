from flask import (Flask, request, session, g, redirect, url_for, render_template,Blueprint,send_from_directory,current_app,abort,jsonify)
from . import article
from ..article.forms import CommentForm
from flask_login import login_required, current_user
from .. import logger, db
from ..models import Article_Comment, Article
import json, uuid
from markupsafe import escape



@article.route('/<article_id>')
def show_article(article_id):
    article = db.session.query(Article).filter(db.and_(Article.id==article_id, Article.visibility==1)).scalar()
    #TODO views +1
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
        abort(500)
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
