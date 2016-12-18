from flask import (render_template,request,redirect, url_for,current_app,abort)
from flask_login import (login_required, current_user)
import json, datetime
from .. import logger
import uuid
from . import user
from ..models import User
from .. import db
from .forms import UserForm


@user.route('/<name>')
def view_user(name):
    user = db.session.query(User.nickname, User.description, User.email_addr, User.avatar, User.reg_time).filter(User.nickname==name).scalar()

    return render_template('user.html', user=user)


@user.route('/edit')
@login_required
def edit_user():
    form = UserForm()
    if not form.validate_on_submit():
        return json.dumps({'result':'data error'})
    user = db.session.query(User).filter(User.nickname==current_user.nickname).scalar()
    if form.avatar.data.strip():
        user.avatar = form.avatar.data.strip()
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


@user.route('/upAvatar', methods=['POST'])
@login_required
def avatar_upload():
    if request.method == 'POST' and 'avatar' in request.files:
        f = request.files['avatar']
        if f:
            avatar_path = current_app.config['AVATAR_SAVE_PATH']
            file_end = f.filename.split(".")[-1]
            if file_end not in current_app.config['ALLOWED_EXTENSIONS']:
                json_result = {"success": False, "msg": "file type not allowed"}
            else:
                name = str(uuid.uuid1()) + '.' + file_end
                try:
                    f.save(avatar_path + name)
                    json_result = {"success": True, "file_path": name}
                except Exception:
                    json_result = {"success": False, "msg": "error"}
    return json.dumps(json_result)