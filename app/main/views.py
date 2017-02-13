#coding: utf-8
from flask import (Flask, request, session, g, redirect, url_for, render_template,Blueprint,send_from_directory,current_app)
from . import main
from ..auth.forms import SigninForm
from flask_login import login_required, current_user
from .. import logger, db, redis
from ..models import Article
import json


@main.route('/')
def index():
    #热门文章redis实现
    result = []
    try:
        top = redis.zrange('pageviews', 0, 10)
        if top:
            info_list = redis.hmget('articles', top)
            for article in info_list:
                if article:
                    info_dict = json.loads(article)
                    tmp = Article()
                    tmp.id = info_dict['id']
                    tmp.title = info_dict['title']
                    tmp.last_modified_time = info_dict['last_modified_time']
                    tmp.author = info_dict['author']
                    tmp.pageviews = int(redis.zscore('pageviews', tmp.id))
                    #TODO like count
                    tmp.like_count = 0
                    result.append(tmp)
    except Exception as e:
        logger.debug(e)
    return render_template('index.html', articles=result)


@main.route('/login')
def login():
    form = SigninForm()
    # return redirect('/auth/signin')
    return render_template('login.html' ,form = form)


@main.route('/mainpage')
@login_required
def main_page():
    nickname = current_user.nickname
    article_query = db.session.query(Article.id, Article.title, Article.last_modified_time, Article.like_count, Article.pageviews)\
        .filter(db.and_(Article.author == current_user.nickname, Article.visibility == 1))
    article_count = article_query.count()
    articles = article_query.order_by(Article.last_modified_time.desc()).slice(0, 10)

    manuscript_query = db.session.query(Article.id, Article.ms_title, Article.last_modified_time, Article.like_count, Article.pageviews)\
        .filter(db.and_(Article.author == current_user.nickname, Article.visibility == 0))
    manuscript_count = manuscript_query.count()
    manuscripts = manuscript_query.order_by(Article.last_modified_time.desc()).slice(0, 10)
    return render_template('mainpage.html', nickname=nickname, articles=articles, article_count=article_count, manuscripts=manuscripts, manuscript_count=manuscript_count)


@main.route('/images/<name>')
def get_images(name):
    img_path = current_app.config['IMG_SAVE_PATH']
    return send_from_directory(img_path, name)


@main.route('/avatars/<name>')
def get_avatars(name):
    img_path = current_app.config['AVATAR_SAVE_PATH']
    return send_from_directory(img_path, name)


@main.app_errorhandler(404)
def page_not_found(error):
    return render_template('404.html'), 404