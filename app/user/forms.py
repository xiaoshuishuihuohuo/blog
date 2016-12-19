from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import Email
from flask_wtf.file import FileField, FileAllowed

class UserForm(FlaskForm):
    description = StringField('description')
    email_addr = StringField('email_addr')
    avatar = FileField('avatar')