import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL') or 'mysql+mysqlconnector://username:password@localhost/ecommerce_db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False