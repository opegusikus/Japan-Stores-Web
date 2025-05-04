from flask import Flask, request, jsonify, session
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # needed for session cookies
CORS(app, supports_credentials=True)  # allow frontend to send/receive cookies

# Sample function to check credentials
def check_credentials(email, password_hash):
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE email=? AND password_hash=?", (email, password_hash))
    user = cursor.fetchone()
    conn.close()
    return user

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('mail')
    password_hash = data.get('pwd')

    if check_credentials(email, password_hash):
        session['user'] = email  # stores in cookie
        return jsonify({"status": 0})  # success
    else:
        return jsonify({"status": 1})  # failure

@app.route('/dashboard.html')
def dashboard():
    if 'user' not in session:
        return redirect('/login.html')  # not logged in
    return send_file('admin.html')

if __name__ == '__main__':
    app.run(debug=True)
