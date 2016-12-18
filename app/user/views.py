from flask import (render_template,request,redirect, url_for,current_app,abort)
from flask_login import (login_required, current_user)
import json, datetime
from .. import logger
import uuid
from . import user
from ..models import User
from .. import db
from .forms import UserForm
from werkzeug import secure_filename


@user.route('/name/<name>')
def view_user(name):
    user = db.session.query(User.nickname, User.description, User.email_addr, User.avatar, User.reg_time).filter(User.nickname==name).scalar()

    return render_template('setting.html', user=user)


@user.route('/setting')
@login_required
def user_setting():
    return render_template('setting.html')


@user.route('/edit', methods=['POST'])
@login_required
def edit_user():
    form = UserForm()
    if not form.validate_on_submit():
        logger.debug(form.errors)
        return json.dumps({'result':'data error'})
    user = db.session.query(User).filter(User.nickname==current_user.nickname).scalar()
    if form.avatar.data:
        avatar_path = current_app.config['AVATAR_SAVE_PATH']
        file_end = secure_filename(form.avatar.data.filename).split(".")[-1]
        if file_end not in current_app.config['ALLOWED_EXTENSIONS']:
            json_result = {"success": False, "msg": "file type not allowed"}
        else:
            name = current_user.nickname + '.' + file_end
            try:
                form.avatar.data.save(avatar_path + name)
                # json_result = {"success": True, "file_path": name}
                user.avatar = name
                db.session.add(user)
                db.session.commit()
                return redirect(url_for('user.user_setting'))
            except Exception as e:
                logger.debug(e)
                json_result = {"success": False, "msg": "error"}
        user.avatar = form.avatar.data
    if form.description.data.strip():
        user.descripton = form.description.data.strip()
    if form.email_addr.data.strip():
        user.email_addr = form.email_addr.data.strip()
    try:
        db.session.add(user)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        logger.debug(e)
        return json.dumps({'result':'error'})
    return json.dumps({'result':'success'})
