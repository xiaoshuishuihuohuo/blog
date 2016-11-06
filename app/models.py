from flask_login import UserMixin
from . import db
from . import login_manager
from werkzeug.security import check_password_hash, generate_password_hash


class User(UserMixin, db.Model):
    __tablename__ = 't_users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True)
    nickname = db.Column(db.String(50))
    email_addr = db.Column(db.String(50))
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


class Article(UserMixin, db.Model):
    __tablename__ = 't_articles'
    id = db.Column(db.String(35), primary_key=True)
    author = db.Column(db.String(50))
    title = db.Column(db.String(100))
    ms_title = db.Column(db.String(100))
    classification = db.Column(db.String(20))
    manuscript = db.Column(db.Text)
    content = db.Column(db.Text)
    create_time = db.Column(db.DateTime)
    last_modified_time = db.Column(db.DateTime)
    like_count = db.Column(db.Integer, server_default='0')
    pageviews = db.Column(db.Integer, server_default='0')
    key_word = db.Column(db.String(50))
    visibility = db.Column(db.Integer,server_default='0')


class Article_Classification(UserMixin, db.Model):
    __tablename__ = 't_article_classifications'
    id = db.Column(db.Integer, primary_key=True)
    code = db.Column(db.String(20), server_default='')
    name = db.Column(db.String(50))
    parent_code = db.Column(db.String(200))


class Article_Comment(UserMixin, db.Model):
    __tablename__ = 't_article_comments'
    id = db.Column(db.String(35), primary_key=True)
    author = db.Column(db.String(50))
    content = db.Column(db.String(1000))
    article_id = db.Column(db.String(35))
    is_reply = db.Column(db.Integer,server_default='0')
    reply_to = db.Column(db.String(35), server_default='')
    like_count = db.Column(db.Integer,server_default='0')
    create_time = db.Column(db.DateTime)
    is_del = db.Column(db.Integer,server_default='0')

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))