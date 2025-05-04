from flask import Flask

def create_app():
    app = Flask(__name__)

    # Configure the app (can be in config.py)
    app.config['SECRET_KEY'] = 'your_secret_key'

    # Register routes
    from . import routes
    app.register_blueprint(routes.bp)

    return app
