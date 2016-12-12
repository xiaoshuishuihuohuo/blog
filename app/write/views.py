from flask import (render_template,request,redirect, url_for,current_app,abort)
from flask_login import (login_required, current_user)
import json, datetime
from .. import logger
import uuid
from . import write
from forms import ArticleForm
from ..models import Article,Article_Classification
from .. import db
from markupsafe import escape
from ..utils.xss import xss_clean


@write.route('/')
@login_required
def write_page():
    classifications = db.session.query(Article_Classification).all()
    return render_template('write.html', id=str(uuid.uuid1()).replace('-', ''), classifications=classifications)


@write.route('/submit', methods=['POST'])
@login_required
def write_submit():
    form = ArticleForm()
    if not form.validate_on_submit():
        logger.debug(form.errors)
        abort(400)
    article = Article()
    article.id = form.id.data
    article.author = current_user.nickname
    article.title = form.title.data
    article.ms_title = ''
    article.classification = form.classification.data
    article.content = xss_clean(form.content.data)
    article.manuscript = ''
    article.last_modified_time = datetime.datetime.now()
    article.visibility = 1
    check_article = db.session.query(Article).filter(Article.id == article.id).scalar()
    if check_article and (check_article.author != current_user.nickname):
        #no right to modified
        logger.debug('you can\'t')
        abort(400)
    try:
        db.session.merge(article)
        # db.session.merge(article)
        db.session.commit()
    except Exception,e:
        logger.debug(e)
        db.session.rollback()
        abort(500)
    return redirect(url_for('main.main_page'))


@write.route('/autoSave',methods=['POST'])
@login_required
def write_auto_save():
    form = ArticleForm()
    if not form.validate_on_submit():
        abort(400)
    article = Article()
    article.id = form.id.data
    article.ms_title = form.title.data
    article.manuscript = xss_clean(form.content.data)
    article.author = current_user.nickname
    check_article = db.session.query(Article).filter(Article.id == article.id).scalar()
    if check_article and (check_article.author != current_user.nickname):
        #no right to modified
        abort(400)
    try:
        db.session.merge(article)
        # db.session.merge(article)
        db.session.commit()
    except Exception,e:
        logger.debug(e)
        db.session.rollback()
        return json.dumps({'result':False})
    return json.dumps({'result':True})
    

@write.route('/upload', methods=['POST'])
@login_required
def write_upload():
    if request.method == 'POST' and 'picture' in request.files:
        f = request.files['picture']
        if f:
            img_path = current_app.config['IMG_SAVE_PATH']
            get_path = current_app.config['GET_IMG_URL']
            name = str(uuid.uuid1()) + '.' + f.filename.split(".")[-1]
            try:
                f.save(img_path + name)
                json_result = {"success": True, "msg": "error message", "file_path": get_path + name}
            except Exception:
                json_result = {"success": False, "msg": "error"}
    return json.dumps(json_result)
