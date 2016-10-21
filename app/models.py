from flask_login import UserMixin
from . import db
from . import login_manager
from werkzeug.security import check_password_hash, generate_password_hash


class User(UserMixin, db.Model):
    __tablename__= 't_users'
    id = db.Column(db.Integer, primary_key=True)
    login_name = db.Column(db.String(50), unique=True)
    email_addr = db.Column(db.String(50))
    username = db.Column(db.String(50))
    password = db.Column(db.String(50))
    last_login_time = db.Column(db.DateTime)
    last_login_ip = db.Column(db.String(50))
    reg_time = db.Column(db.DateTime)

    def verify_password(self,password):
        return check_password_hash(self.password, password)

    @property
    def passwd(self):
        raise AttributeError('password is not a readable attribute')

    @passwd.setter
    def passwd(self, password):
        self.password = generate_password_hash(password)


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))