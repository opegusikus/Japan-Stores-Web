from flask import Blueprint, render_template, request, session, redirect, jsonify

bp = Blueprint('main', __name__)

@bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # Handle login (check user credentials)
        return redirect('/dashboard')
    return render_template('admin.html')

@bp.route('/dashboard')
def dashboard():
    if 'user' not in session:
        return redirect('/login')
    return render_template('login.html')
