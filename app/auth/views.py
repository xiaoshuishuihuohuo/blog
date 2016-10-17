from flask import (Flask, request, session, g, redirect, url_for, render_template,Blueprint,flash)
from . import auth
from .forms import signinForm
import json
@auth.route('/signin', methods=['POST'])
def signin():
	# username = request.form.get('username')
	form = signinForm()
	if form.validate_on_submit():
		if form.username.data == 'fuck':
			flash('don\'t use fuck' )
			return redirect(url_for('main.login'))
		return redirect(url_for('main.mainpage'))
	first_error = form.errors.values()[0][0]
	flash(first_error)
	return redirect(url_for('main.login'))
	

# @auth.route('/regist', methods=['POST'])
# def regist():
#     form = regForm()
# 	if form.validate_on_submit():
# 		return redirect('/mainpage')
# 	message = form.errors.values()[0][0]
# 	print message
# 	flash(message)
# 	return redirect(url_for('main.login'))

