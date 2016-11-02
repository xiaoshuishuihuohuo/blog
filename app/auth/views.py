from flask import (Flask, request, make_response, session, g, redirect, url_for, render_template,Blueprint,flash)
from . import auth
from .forms import SigninForm, RegForm, CheckForm, CaptchaForm
import json
from ..models import User
from .. import db
from flask_login import login_user
from sqlalchemy import func
from .. import logger
from ..utils import captcha


@auth.route('/signin', methods=['POST'])
def signin():
    if not session.has_key('error_times'):
        session['error_times'] = 0

    if not session.has_key('need_captcha'):
        session['need_captcha'] = False

    cap_form = CaptchaForm()
    form = SigninForm()

    if (session['need_captcha'] and (not cap_form.validate_on_submit())) or (not form.validate_on_submit()):
        abort(500)

    result={'success':False}
    if session['need_captcha']:
        if not session['captcha_code']  == cap_form.captcha:
            result['message'] = 'cap'
            return json.dumps(result)

    user = User.query.filter_by(username=form.username.data).first()
    if user is not None and user.verify_password(form.password.data):
        login_user(user, form.remember_me.data)
        #TODO
        session.pop()
        result['success'] = True
        result['url'] = url_for('main.main_page')
        return json.dumps(result)
    else:
        error_time = session['error_times']
        if error_time < 3:
            session['error_times'] = error_time + 1
            result['message'] = 'wrong'
        else:
            if not session['need_captcha']:
                session['need_captcha'] = True
                result['message'] = 'need'
        return json.dumps(result)


@auth.route('/regist', methods=['POST'])
def regist():
    form = RegForm()
    if not form.validate_on_submit():
        abort(500)
    user = User(passwd=form.signup_password.data)
    user.username = form.signup_username.data
    user.nickname = form.signup_username.data
    user.email_addr = ''
    user.login_name = ''
    db.session.add(user)
    db.session.commit()
    login_user(user)
    return json.dumps({'success':True,'url':url_for('main.main_page')})


@auth.route('/regist/checkUser', methods=['POST'])
def check_user():
    form = CheckForm()
    if form.validate_on_submit():
        r = db.session.query((db.session.query(User).filter(User.username == form.signup_username.data)).exists()).scalar()
        if r:
            return json.dumps({'exist':True})
    return json.dumps({'exist':False})

@auth.route('/auth/captcha')
def get_captcha():
    code = captcha.generate_randStr()
    session['captcha_code'] = code
    img = captcha.generate_captcha(code)
    return img
    
    # buf = StringIO.StringIO()
    # img.save(buf,'png',quality=70)
    # buf_str = buf.getvalue()
    # response = make_response(buf_str)
    # response.headers['Content-Type'] = 'image/png'
    # return response 