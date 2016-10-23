from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class ArticleForm(FlaskForm):
    article_id = StringField('title', validators=[DataRequired(message='You must have an id')])
    title = StringField('title', validators=[DataRequired(message='You must have an title')])
    classification = StringField('classification', validators=[DataRequired(message='You must have a classification')])
    content = StringField('content', validators=[DataRequired(message='You must have a content')])
    key_word = StringField('key word', validators=[DataRequired(message='You must have a key word')])
