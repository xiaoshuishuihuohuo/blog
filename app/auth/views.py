from flask import (Flask, request, session, g, redirect, url_for, render_template,Blueprint,flash)
from . import auth
from .forms import SigninForm, RegForm, CheckForm
import json
from ..models import User
from .. import db
from flask_login import login_user
from sqlalchemy import func
from .. import logger


@auth.route('/signin', methods=['POST'])
def signin():
    form = SigninForm()
    a= form.remember_me.data
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user is not None and user.verify_password(form.password.data):
            login_user(user, form.remember_me.data)
            return redirect(url_for('main.main_page'))
        else:
            flash('error')
            return redirect(url_for('main.login'))
    first_error = form.errors.values()[0][0]
    flash(first_error)
    return redirect(url_for('main.login'))


@auth.route('/regist', methods=['POST'])
def regist():
    form = RegForm()
    if form.validate_on_submit():
        user = User(passwd=form.signup_password.data)
        user.username = form.signup_username.data
        user.nickname = form.signup_username.data
        user.email_addr = ''
        user.login_name = ''
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return redirect(url_for('main.main_page'))
    message = form.errors.values()[0][0]
    print message
    flash(message)
    return redirect(url_for('main.login'))

@auth.route('/regist/checkUser', methods=['POST'])
def check_user():
    form = CheckForm()
    if form.validate_on_submit():
        r = db.session.query((db.session.query(User).filter(User.username == form.signup_username.data)).exists()).scalar()
        if r:
            return json.dumps({'exist':True})
    return json.dumps({'exist':False})