from flask.ext.login import UserMixin

class User(UserMixin, db.Model):
	__tablename__= 't_users'
	id = db.Column(db.Integer, primary_key=True)
	loginName = db.Column(db.String(50), unique=True)
	emailAddr = db.Column(db.String(50))
	userName = db.Column(db.String(50))
	password = db.Column(db.String(50))
	lastLoginTime = db.Column(db.DateTime)
	lastLoginIp = db.Column(db.String(50))
	isLogon = db.Column(db.tinyint)
	regTime = db.Column(db.DateTime, default=datetime.utcnow)
	salt = db.Column(db.String(50),)

from . import login_manager
@login_manager.user_loader
def load_user(user_id):
	return 