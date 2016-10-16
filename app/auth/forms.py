from flask_wtf import FlaskForm
from wtforms import TextField,BooleanField,PasswordField
from wtforms.validators import DataRequired,EqualTo

class signinForm(FlaskForm):
    username = TextField('username', validators=[DataRequired(message='You must have an name')])
    password = PasswordField('password', validators=[DataRequired(message='We should have your password')])
    remember_me = BooleanField('remember-me',default=False)


class regForm(FlaskForm):
	username = TextField('signup-username', validators=[DataRequired()])
	password = PasswordField('signup-password', validators=[DataRequired(),EqualTo('signup-confirm', message='Passwords must match')])
