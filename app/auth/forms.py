from flask_wtf import FlaskForm
from wtforms import StringField,BooleanField,PasswordField
from wtforms.validators import DataRequired,EqualTo


class SigninForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(message='name')])
    password = PasswordField('password', validators=[DataRequired(message='pwd')])
    remember_me = BooleanField('remember_me', default=False)
    

class RegForm(FlaskForm):
    signup_username = StringField(validators=[DataRequired(message='name')])
    signup_password = PasswordField(validators=[DataRequired(),EqualTo('signup_confirm', message='pwd')])
    signup_confirm = PasswordField(validators=[DataRequired(message='pwd')])


class CheckForm(FlaskForm):
    signup_username = StringField(validators=[DataRequired()])


class CaptchaForm(FlaskForm):
    captcha = StringField('captcha', validators=[DataRequired(message='cap')])