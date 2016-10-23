from flask import (render_template,request,current_app)
from flask_login import login_required
import json
from .. import logger
import uuid
from . import write
from forms import ArticleForm
from ..models import Article

@write.route('/')
@login_required
def write_page():
    return render_template('write.html')


@write.route('/submit')
@login_required
def write_submit():
    form = ArticleForm()
    if form.validate_on_submit():
        article = Article()
        article.article_id = form.article_id
        # article.author =
    return render_template('write.html')


@write.route('/save')
@login_required
def write_save():
    return render_template('write.html')


@write.route('/upload', methods=['POST'])
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