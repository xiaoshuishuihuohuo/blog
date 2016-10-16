from flask import (Flask, request, session, g, redirect, url_for, render_template,Blueprint)
from . import main
from ..auth.forms import signinForm
from flask_login import login_required

@main.route('/')
def index():
    return render_template('index.html')


@main.route('/login')
def login():
	form = signinForm()
    # return redirect('/auth/signin')
	return render_template('login.html' ,form = form)

@main.route('/mainpage')
@login_required
def mainpage():
	return 'main page'