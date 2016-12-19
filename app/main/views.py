from flask import (Flask, request, session, g, redirect, url_for, render_template,Blueprint,send_from_directory,current_app)
from . import main
from ..auth.forms import SigninForm
from flask_login import login_required, current_user
from .. import logger, db
from ..models import Article


@main.route('/')
def index():
    articles = db.session.query(Article.id, Article.title, Article.last_modified_time, Article.like_count, Article.pageviews)\
        .filter(Article.visibility == 1).order_by(Article.like_count.desc()).order_by(Article.last_modified_time.desc()).slice(0, 10)
    return render_template('index.html', articles=articles)


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