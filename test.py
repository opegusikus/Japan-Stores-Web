from flask import Flask, redirect, url_for, request
app = Flask(__name__)


@app.route('/success/<name>')
def success(name):
    return 'welcome %s' % name

@app.route('/fuck_you_you_r_not_admin/<name>')
def fail(name):
    return 'fuck you %s' % name

@app.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        user = request.form['username']
        if user == 'admin':
            return redirect(url_for('success', name=user))
        else:
            return redirect(url_for('fail', name=user))
    else:
        user = request.args.get('username')
        if user == 'admin':
            return redirect(url_for('success', name=user))
        else:
            return redirect(url_for('fail', name=user))


if __name__ == '__main__':
    app.run(debug=True)
