from flask import (Flask, request, session, g, redirect, url_for, render_template,Blueprint,flash)
from . import auth
from .forms import signinForm
import json
@auth.route('/signin', methods=['POST'])
def signin():
	# username = request.form.get('username')
	form = signinForm()
	if form.validate_on_submit():
		print form.username.data
		if form.username.data == 'asd':
			return json.dumps({'result':0,'message':'fuck'})
		return json.dumps({'result':1})
	print form.errors
	return json.dumps({'result':0,'message':'fuck'})
	

# @auth.route('/regist', methods=['POST'])
# def regist():
#     form = regForm()
# 	if form.validate_on_submit():
# 		return redirect('/mainpage')
# 	message = form.errors.values()[0][0]
# 	print message
# 	flash(message)
# 	return redirect(url_for('main.login'))

