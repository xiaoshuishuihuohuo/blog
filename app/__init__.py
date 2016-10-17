from flask import Flask
from flask_wtf.csrf import CsrfProtect
from flask_login import LoginManager
def create_app():
	app = Flask(__name__)
	from .main import main as main_blueprint
	app.register_blueprint(main_blueprint)
	from .auth import auth as auth_blueprint
	app.register_blueprint(auth_blueprint, url_prefix = '/auth')
	
	csrf = CsrfProtect()
	csrf.init_app(app)

	login_manager = LoginManager()
	login_manager.init_app(app)

	app.config['SECRET_KEY']='fuck'
	return app

