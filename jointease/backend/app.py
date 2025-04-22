from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_migrate import Migrate
from flask_jwt_extended import create_access_token, JWTManager, jwt_required, get_jwt_identity
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db' 
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["JWT_SECRET_KEY"] = "super-secret" 
jwt = JWTManager(app)
db = SQLAlchemy(app)
migrate = Migrate(app, db)
CORS(app)  

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f'<User {self.username}>'

with app.app_context():
    db.create_all() # Ensure tables are created (run only once or with migrations)
    
@app.route('/')  # Add this route to handle GET requests to the root path
def index():
    return "Flask backend is running!"  # Or any other message/data you want to display


@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('email')  # Using email as username for simplicity
    email = data.get('email')
    password = data.get('password')

    if not username or not password or not email:
        return jsonify({'message': 'All fields are required'}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'User with this email already exists'}), 409

    new_user = User(username=username, email=email)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'Registration successful'}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'message': 'Email and password are required'}), 400

    user = User.query.filter_by(email=email).first()

    if user and user.check_password(password):
        access_token = create_access_token(identity=user.id)
        return jsonify({'access_token': access_token}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/api/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if user:
        return jsonify({'message': f'Hello, {user.username}! This is a protected route.'}), 200
    else:
        return jsonify({'message': 'User not found'}), 404

if __name__ == '__main__':
    app.run(debug=True, port=5001)