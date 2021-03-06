import os
from . import db
from flask import Flask, redirect, url_for, render_template

# This is for Heroku
from werkzeug.contrib.fixers import ProxyFix


def start_app():
    # create and configure the app
    a = Flask(__name__, instance_relative_config=True)
    a.wsgi_app = ProxyFix(a.wsgi_app)

    # TODO: what's the difference between these two lines?
    a.config.from_mapping(SECRET_KEY="dev")
    a.secret_key = "supersekrit12345"

    from . import index
    a.register_blueprint(index.blueprint)

    return a
