from flask import Blueprint


write = Blueprint('write', __name__)

from . import views