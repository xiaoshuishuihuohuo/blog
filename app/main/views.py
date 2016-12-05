from flask import (Flask, request, session, g, redirect, url_for, render_template,Blueprint,send_from_directory,current_app)
from . import main
from ..auth.forms import SigninForm
from flask_login import login_required, current_user
from .. import logger, db
from ..models import Article


@main.route('/')
def index():
    return render_template('index.html')


@main.route('/login')
def login():
    form = SigninForm()
    # return redirect('/auth/signin')
    return render_template('login.html' ,form = form)

    
@main.route('/user/<user>')
def view_user(user):
    return user


@main.route('/mainpage')
@login_required
def main_page():
    nickname = current_user.nickname

    counts = db.session.query(db.func.count(Article.id))\
        .filter(db.and_(Article.author == current_user.nickname, Article.visibility == 1)).scalar()
    articles = db.session.query(Article.id, Article.title, Article.last_modified_time, Article.like_count, Article.pageviews)\
        .filter(db.and_(Article.author == current_user.nickname, Article.visibility == 1))\
        .order_by(Article.last_modified_time.desc()).slice(0, 10)
    return render_template('mainpage.html', nickname=nickname, articles=articles, counts=counts)


@main.route('/images/<name>')
def get_images(name):
    img_path = current_app.config['IMG_SAVE_PATH']
    return send_from_directory(img_path, name)


@main.app_errorhandler(404)
def page_not_found(error):
    return render_template('404.html'), 404