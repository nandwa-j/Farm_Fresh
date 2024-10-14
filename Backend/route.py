from flask import Blueprint, request, jsonify
from models import User, Product, Order, Cart
from database import db
from werkzeug.security import generate_password_hash, check_password_hash

api = Blueprint('api', __name__)

# Fetch all products
@api.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([{'id': p.id, 'name': p.name, 'price': p.price, 'image': p.image} for p in products])

# Manage cart (GET & POST)
@api.route('/cart', methods=['GET', 'POST'])
def manage_cart():
    if request.method == 'GET':
        user_id = request.args.get('user_id')
        cart_items = Cart.query.filter_by(user_id=user_id).all()
        return jsonify([{'product_id': ci.product_id, 'quantity': ci.quantity} for ci in cart_items])
    
    if request.method == 'POST':
        data = request.json
        cart_item = Cart(user_id=data['user_id'], product_id=data['product_id'], quantity=data['quantity'])
        db.session.add(cart_item)
        db.session.commit()
        return jsonify({'message': 'Item added to cart!'}), 201

# Checkout
@api.route('/checkout', methods=['POST'])
def checkout():
    data = request.json
    order = Order(user_id=data['user_id'], total_price=data['total_price'])
    db.session.add(order)
    db.session.commit()
    return jsonify({'message': 'Order placed successfully!'}), 201

# User Registration
@api.route('/register', methods=['POST'])
def register():
    data = request.json
    hashed_password = generate_password_hash(data['password'], method='sha256')
    new_user = User(username=data['username'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created successfully!'}), 201

# User Login
@api.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(username=data['username']).first()
    if user and check_password_hash(user.password, data['password']):
        return jsonify({'message': 'Login successful!'}), 200
    return jsonify({'message': 'Invalid credentials!'}), 401
