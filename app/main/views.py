from flask import Flask, request, session, g, redirect, url_for, render_template
from . import main

@main.route('/')
def index():
	return render_template('index.html')

@main.route('/login')
def login():
	return render_template('login.html')

@main.route('/user/<name>')
def userMainPage(name):
	return name
