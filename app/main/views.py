from flask import (Flask, request, session, g, redirect, url_for, render_template,Blueprint)
from . import main
from ..auth.forms import SigninForm
from flask_login import login_required


@main.route('/')
def index():
    return render_template('index.html')


@main.route('/login')
def login():
    form = SigninForm()
    # return redirect('/auth/signin')
    return render_template('login.html' ,form = form)


@main.route('/mainpage')
@login_required
def main_page():
    return render_template('mainpage.html')

@main.route('/write')
@login_required
def write_page():
    return render_template('write.html')

