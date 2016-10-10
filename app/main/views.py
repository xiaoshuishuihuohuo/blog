from flask import Flask, request, session, g, redirect, url_for, render_template
from . import main
@main.route('/login')
def login():
	return render_template('index.html')

@main.route('/')
def index():
	return redirect('/login')