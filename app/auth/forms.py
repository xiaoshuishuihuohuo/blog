from flask_wtf import FlaskForm
from wtforms import StringField,BooleanField,PasswordField
from wtforms.validators import DataRequired,EqualTo


class SigninForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(message='You must have an name')])
    password = PasswordField('password', validators=[DataRequired(message='We should have your password')])
    remember_me = BooleanField('remember_me', default=False)


class RegForm(FlaskForm):
    signup_username = StringField(validators=[DataRequired(message='You must have an name')])
    signup_password = PasswordField(validators=[DataRequired(),EqualTo('signup_confirm', message='Passwords must '
                                                                                                 'match')])
    signup_confirm = PasswordField(validators=[DataRequired()])
