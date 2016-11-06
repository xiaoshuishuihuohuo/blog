from flask import (Flask, request, session, g, redirect, url_for, render_template,Blueprint,send_from_directory,current_app)
from . import article
from ..article.forms import CommentForm
from flask_login import login_required, current_user
from .. import logger, db
from ..models import Article_Comment, Article
from sqlalchemy import and_, func
import json, uuid


@article.route('/<article_id>')
def show_article(article_id):
    article = db.session.query(Article).filter(Article.id==article_id).scalar()
    #TODO views +1
    return render_template('article.html',article=article)


@article.route('/comment',methods=['POST'])
@login_required
def comment():
    form = CommentForm()
    if not form.validate_on_submit():
        abort(500)
    comment = Article_Comment()
    comment.article_id = form.article_id.data
    comment.content = form.content.data
    comment.is_reply = form.is_reply.data
    comment.reply_to = form.reply_to.data
    comment.id = str(uuid.uuid1()).replace('-', '')
    comment.author = current_user.nickname
    try:
        db.session.add(comment)
        db.session.commit()
    except Exception,e:
        return json.dumps({'result':False})
    return json.dumps({'result':True})

