from flask import Flask
from config import Config
from database import db
from routes import api
from flask_cors import CORS

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)
CORS(app)

@app.before_first_request
def create_tables():
    db.create_all()

app.register_blueprint(api, url_prefix='/api')

if __name__ == '__main__':
    app.run(debug=True)
