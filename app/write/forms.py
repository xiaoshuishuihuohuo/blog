from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class ArticleForm(FlaskForm):
    id = StringField('id', validators=[DataRequired()])
    title = StringField('title', validators=[DataRequired()])
    classification = StringField('classification')
    content = StringField('content', validators=[DataRequired()])
    # key_word = StringField('key word', validators=[DataRequired(message='You must have a key word')])
