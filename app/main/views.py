from flask import (Flask, request, session, g, redirect, url_for, render_template,Blueprint,send_from_directory,current_app)
from . import main
from ..auth.forms import SigninForm
from flask_login import login_required, current_user
from .. import logger, db
from ..models import Article
from sqlalchemy import and_


@main.route('/')
def index():
    return render_template('index.html')


@main.route('/login')
def login():
    form = SigninForm()
    # return redirect('/auth/signin')
    return render_template('login.html' ,form = form)


@main.route('/view/<user>/<article>')
def view_article(user, article):
    return user+','+article
        
    
@main.route('/user/<user>')
def view_user(user):
    return user


@main.route('/mainpage')
@login_required
def main_page():
    username = current_user.username
    article_list = db.session.query(Article.id).filter(and_(Article.author == username, Article.visibility == 1)).all()
    logger.debug(article_list)
    return render_template('mainpage.html',username = current_user.username)


@main.route('/images/<name>')
def get_images(name):
    img_path = current_app.config['IMG_SAVE_PATH']
    return send_from_directory(img_path, name)
