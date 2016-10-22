from flask import (Flask, request, session, g, redirect, url_for, render_template,Blueprint,send_from_directory,current_app)
from . import main
from ..auth.forms import SigninForm
from flask_login import login_required
import json
from .. import logger
import uuid


@main.route('/')
def index():
    return render_template('index.html')


@main.route('/login')
def login():
    form = SigninForm()
    # return redirect('/auth/signin')
    return render_template('login.html' ,form = form)


@main.route('/mainpage')
@login_required
def main_page():
    return render_template('mainpage.html')


@main.route('/write')
@login_required
def write_page():
    return render_template('write.html')


@main.route('/write/upload', methods=['POST'])
@login_required
def write_upload():
    if request.method == 'POST' and 'picture' in request.files:
        f = request.files['picture']
        if f:
            img_path = current_app.config['IMG_SAVE_PATH']
            get_path = current_app.config['GET_IMG_URL']
            name = str(uuid.uuid1()) + '.' +f.filename.split(".")[-1]
            try:

                f.save(img_path + name)
                json_result = {"success": True, "msg": "error message", "file_path": get_path + name}
            except Exception:
                json_result = {"success": False, "msg": "error"}
    return json.dumps(json_result)


@main.route('/images/<name>')
def get_images(name):
    img_path = current_app.config['IMG_SAVE_PATH']
    return send_from_directory(img_path, name)
