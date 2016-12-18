from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import Email


class UserForm(FlaskForm):
    description = StringField('description')
    email_addr = StringField('email_addr', validators=[Email()])
    avatar = StringField('avatar')