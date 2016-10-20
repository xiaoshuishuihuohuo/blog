from flask import Flask
from flask_wtf.csrf import CsrfProtect
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
csrf = CsrfProtect()
login_manager = LoginManager()


def create_app():
    app = Flask(__name__)
    
    app.config['SECRET_KEY']='fuck'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://mysql:123@192.168.1.5/blog'
    
    db.init_app(app)
    csrf.init_app(app)
    login_manager.init_app(app)

    from .main import main as main_blueprint
    app.register_blueprint(main_blueprint)

    from .auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint, url_prefix = '/auth')
    
    return app

