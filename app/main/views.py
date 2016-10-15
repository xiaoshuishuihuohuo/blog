from flask import (Flask, request, session, g, redirect, url_for, render_template,Blueprint)

main = Blueprint('main', __name__)

@main.route('/')
def index():
    return render_template('index.html')


@main.route('/login')
def login():
    return render_template('login.html')

