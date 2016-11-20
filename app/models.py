from flask_login import UserMixin
from . import db
from . import login_manager
from werkzeug.security import check_password_hash, generate_password_hash
from sqlalchemy.orm import relationship
from sqlalchemy.schema import ForeignKey
from . import logger


class User(UserMixin, db.Model):
    __tablename__ = 't_users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True)
    nickname = db.Column(db.String(50))
    description = db.Column(db.String(100), server_default='')
    email_addr = db.Column(db.String(50))
    password = db.Column(db.String(50))
    avatar = db.Column(db.String(35), server_default='')
    last_login_time = db.Column(db.DateTime)
    last_login_ip = db.Column(db.String(50))
    reg_time = db.Column(db.DateTime)

    comments = relationship('Article_Comment')

    def verify_password(self,password):
        return check_password_hash(self.password, password)

    def to_json(self):
        json_user = {
            'id': self.id,
            'username': self.username,
            'nickname': self.nickname,
            'description': self.description,
            'avatar': self.avatar
        }
        return json_user

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
    author_id = db.Column(db.Integer, ForeignKey('t_users.id'))
    author = relationship("User")
    content = db.Column(db.String(1000))
    article_id = db.Column(db.String(35))
    is_reply = db.Column(db.Integer,server_default='0')
    reply_to = db.Column(db.String(35), server_default='')
    like_count = db.Column(db.Integer,server_default='0')
    create_time = db.Column(db.DateTime)
    is_del = db.Column(db.Integer,server_default='0')

    def get_comment_author(self, comment_id):
        return db.session.query(User).filter(User.id == db.session.query(Article_Comment.author_id)\
        .filter(Article_Comment.id == comment_id)).scalar()

    def to_json(self):
        json_comment = {
            'id': self.id,
            'author': self.author.to_json(),
            'content': self.content,
            'is_reply': self.is_reply,
            'like_count': self.like_count,
            'create_time': self.create_time.strftime('%Y-%m-%d %H:%M:%S')
        }
        if self.is_reply:
            json_comment['reply_to'] = self.reply_to
            tmp_author = self.get_comment_author(self.reply_to)
            if tmp_author:
                json_comment['reply_to_who'] = tmp_author.to_json()
            else:
                json_comment['reply_to_who'] = ''
        return json_comment

class Like(UserMixin, db.Model):
    __tablename__ = 't_likes'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(30))
    like_id = db.Column(db.String(30))
    like_type = db.Column(db.Integer)
    create_time = db.Column(db.DateTime)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))