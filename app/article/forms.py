from flask_wtf import FlaskForm
from wtforms import StringField,BooleanField,PasswordField
from wtforms.validators import DataRequired,EqualTo


class CommentForm(FlaskForm):
    content = StringField('content', validators=[DataRequired()])
    article_id = StringField('article_id', validators=[DataRequired()])
    is_reply = BooleanField('is_reply')
    reply_to = StringField('reply_to')

class LikeForm(FlaskForm):
    like_id = StringField('like_id', validators=[DataRequired()])