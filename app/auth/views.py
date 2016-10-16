from flask import (Flask, request, session, g, redirect, url_for, render_template,Blueprint)
from . import auth

@auth.route('/signin', methods=['POST'])
def signin():
    return render_template('login.html')


@auth.route('/regist', methods=['POST'])
def regist():
    return 'test regitst'

