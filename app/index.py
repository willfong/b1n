import random
from flask import Blueprint, redirect, url_for, render_template, request, session, flash
from . import db


blueprint = Blueprint("index", __name__, url_prefix="/")


@blueprint.route("/")
def home():
    # Content should only show once, when it's set by /new
    content = session.get("content", "")
    if "content" in session:
        del session["content"]
    return render_template("index.html", content=content)


@blueprint.route("/new", methods=["POST"])
def new():
    access_code = random.randint(1000, 10000)
    content = request.form.get("content")
    query = "INSERT INTO bins (access_code, content) VALUES (%s, %s)"
    params = (access_code, content)
    db.write(query, params)
    session["content"] = content
    flash("b1n Access Code: {}".format(access_code), "success")
    return redirect(url_for("index.home"))


@blueprint.route("/view", methods=["POST"])
def view():
    access_code = request.form.get("access_code")
    query = "SELECT content FROM bins WHERE access_code = %s AND created > NOW() - INTERVAL '1 MINUTE'"
    params = (request.form.get("access_code"),)
    content = db.read(query, params, one=True)
    return render_template("view.html", content=content[0])
