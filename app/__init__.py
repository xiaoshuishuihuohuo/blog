from flask import Flask
from flask_wtf.csrf import CsrfProtect
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
import os
from config import Config
from log import Logger
db = SQLAlchemy()
csrf = CsrfProtect()
login_manager = LoginManager()
logger = Logger()


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    if not os.path.exists(app.config['IMG_SAVE_PATH']):
        os.makedirs(app.config['IMG_SAVE_PATH'])

    logger.init_app(app)
    db.init_app(app)
    csrf.init_app(app)
    login_manager.init_app(app)
    login_manager.login_view = '/login'

    from .main import main as main_blueprint
    app.register_blueprint(main_blueprint)

    from .auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint, url_prefix='/auth')

    from .write import write as write_blueprint
    app.register_blueprint(write_blueprint, url_prefix='/write')
    
    from .article import article as article_blueprint
    app.register_blueprint(article_blueprint, url_prefix='/article')

    from .user import user as user_blueprint
    app.register_blueprint(user_blueprint, url_prefix='/user')

    return app

