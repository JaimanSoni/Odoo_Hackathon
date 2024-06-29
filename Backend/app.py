from flask import Flask, redirect, url_for, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from flask_dance.contrib.google import make_google_blueprint, google
from flask_dance.contrib.facebook import make_facebook_blueprint, facebook
from flask_cors import CORS
from flask_migrate import Migrate
from flask_socketio import SocketIO, emit, join_room, leave_room
import os
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = './Images'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
# import razorpay
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///music_app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your_secret_key'  # Replace with your secret key
CORS(app)

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'
socketio = SocketIO(app, cors_allowed_origins="*")

migrate = Migrate(app, db)

facebook_bp = make_facebook_blueprint(client_id='your_facebook_client_id', client_secret='your_facebook_client_secret', redirect_to='facebook_login')
app.register_blueprint(facebook_bp, url_prefix="/facebook_login")

# razorpay_client = razorpay.Client(auth=(app.config['RAZORPAY_KEY_ID'], app.config['RAZORPAY_KEY_SECRET']))


class User(db.Model, UserMixin):
    __tablename__ = 'users'
    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    password_hash = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    role = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)
    
    def get_id(self):
        return str(self.user_id)

class Post(db.Model):
    __tablename__ = 'posts'
    post_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    content = db.Column(db.Text, nullable=False)
    like = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())


class Profile(db.Model):
    __tablename__ = 'profiles'
    profile_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    name = db.Column(db.String(100))
    bio = db.Column(db.Text)
    profile_picture_url = db.Column(db.String(255))
    user = db.relationship('User', back_populates='profile')

User.profile = db.relationship('Profile', back_populates='user', uselist=False)

class Musician(db.Model):
    __tablename__ = 'musicians'
    musician_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    genre = db.Column(db.String(50))
    user = db.relationship('User', back_populates='musician')

User.musician = db.relationship('Musician', back_populates='user', uselist=False)

class Fan(db.Model):
    __tablename__ = 'fans'
    fan_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    preferences = db.Column(db.Text)
    user = db.relationship('User', back_populates='fan')

User.fan = db.relationship('Fan', back_populates='user', uselist=False)

class Event(db.Model):
    __tablename__ = 'events'
    event_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    musician_id = db.Column(db.Integer, db.ForeignKey('musicians.musician_id'), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    # total_capacity = db.Column(db.String(100), nullable=False)
    # gold_price = db.Column(db.String(100), nullable=False)
    # silver_price = db.Column(db.String(100), nullable=False)
    # platinum_price = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    event_date = db.Column(db.DateTime, nullable=False)
    location = db.Column(db.String(255), nullable=False)
    musician = db.relationship('Musician', back_populates='events')

Musician.events = db.relationship('Event', back_populates='musician')

class Ticket(db.Model):
    __tablename__ = 'tickets'
    ticket_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    event_id = db.Column(db.Integer, db.ForeignKey('events.event_id'), nullable=False)
    fan_id = db.Column(db.Integer, db.ForeignKey('fans.fan_id'), nullable=False)
    purchase_date = db.Column(db.DateTime, server_default=db.func.now())
    price = db.Column(db.Numeric(10, 2))
    event = db.relationship('Event', back_populates='tickets')
    fan = db.relationship('Fan', back_populates='tickets')

Event.tickets = db.relationship('Ticket', back_populates='event')
Fan.tickets = db.relationship('Ticket', back_populates='fan')

class Payment(db.Model):
    __tablename__ = 'payments'
    payment_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    ticket_id = db.Column(db.Integer, db.ForeignKey('tickets.ticket_id'), nullable=False)
    amount = db.Column(db.Numeric(10, 2))
    payment_date = db.Column(db.DateTime, server_default=db.func.now())
    payment_method = db.Column(db.Enum('credit_card', 'paypal', 'stripe'))
    ticket = db.relationship('Ticket', back_populates='payments')

Ticket.payments = db.relationship('Payment', back_populates='ticket')

class Stream(db.Model):
    __tablename__ = 'streams'
    stream_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    event_id = db.Column(db.Integer, db.ForeignKey('events.event_id'), nullable=False)
    stream_url = db.Column(db.String(255), nullable=False)
    start_time = db.Column(db.DateTime)
    end_time = db.Column(db.DateTime)
    event = db.relationship('Event', back_populates='streams')

Event.streams = db.relationship('Stream', back_populates='event')

class Chat(db.Model):
    __tablename__ = 'chats'
    chat_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    stream_id = db.Column(db.Integer, db.ForeignKey('streams.stream_id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    message = db.Column(db.Text)
    timestamp = db.Column(db.DateTime, server_default=db.func.now())
    stream = db.relationship('Stream', back_populates='chats')
    user = db.relationship('User', back_populates='chats')

Stream.chats = db.relationship('Chat', back_populates='stream')
User.chats = db.relationship('Chat', back_populates='user')

class Recommendation(db.Model):
    __tablename__ = 'recommendations'
    recommendation_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    recommended_event_ids = db.Column(db.Text)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    user = db.relationship('User', back_populates='recommendations')

User.recommendations = db.relationship('Recommendation', back_populates='user')


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/')
def index():
    
    return 'Welcome to the Music App!'

@app.route('/delete-all-users', methods=['DELETE'])
def delete_all_users():
    try:
        # Query all users
        users = Event.query.all()

        # Delete each user from the database
        for user in users:
            db.session.delete(user)
        
        # Commit the changes to the database
        db.session.commit()

        return jsonify({'message': 'All users deleted successfully'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')
    role = data.get('role')
    role = role.lower()  # Expecting 'fan' or 'musician' 

    if not username or not password or not email or not role:
        return jsonify({'message': 'Missing required fields'}), 400

    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return jsonify({'message': 'Username already taken'}), 409

    existing_email = User.query.filter_by(email=email).first()
    if existing_email:
        return jsonify({'message': 'Email already registered'}), 409

    password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(username=username, password_hash=password_hash, email=email, role=role)

    db.session.add(new_user)
    db.session.commit()

    # Create profile based on role
    if role == 'musician':
        new_profile = Musician(user_id=new_user.user_id)
        db.session.add(new_profile)
    elif role == 'fan':
        new_profile = Fan(user_id=new_user.user_id)
        db.session.add(new_profile)

    db.session.commit()
    
    login_user(new_user)
    return jsonify({'message': 'User registered successfully'}), 201


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('email') 
    password = data.get('password')
    
    user = User.query.filter_by(email=username).first()
    if user and user.check_password(password):
        login_user(user)
        return jsonify({'message': 'Logged in successfully'}), 200
    else:
        return jsonify({'message': 'Invalid username or password'}), 401
    


    

@app.route('/google_login')
def google_login():
    if not google.authorized:
        return redirect(url_for('google.login'))
    resp = google.get("/plus/v1/people/me")
    assert resp.ok, resp.text
    google_info = resp.json()
    google_email = google_info['emails'][0]['value']

    user = User.query.filter_by(email=google_email).first()
    if not user:
        user = User(username=google_info['displayName'], email=google_email, password_hash='', role='fan')  # Assign a default role or get from user
        db.session.add(user)
        db.session.commit()
    
    login_user(user)
    return jsonify({'message': 'Invalid username or password'}), 200


@app.route('/facebook_login')
def facebook_login():
    if not facebook.authorized:
        return redirect(url_for('facebook.login'))
    resp = facebook.get("/me?fields=id,name,email")
    assert resp.ok, resp.text
    facebook_info = resp.json()
    facebook_email = facebook_info['email']

    user = User.query.filter_by(email=facebook_email).first()
    if not user:
        user = User(username=facebook_info['name'], email=facebook_email, password_hash='', role='fan')  # Assign a default role or get from user
        db.session.add(user)
        db.session.commit()
    
    login_user(user)
    return redirect(url_for('index'))

@app.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'Logged out successfully'}), 200



@app.route('/create-event', methods=['POST'])
@login_required
def create_event():
    if current_user.role != 'musician':
        return jsonify({'message': 'Only musicians can create events'}), 403

    data = request.get_json()
    title = data.get('title')
    description = data.get('description')
    event_date = data.get('event_date')  # Expected in ISO format: "YYYY-MM-DDTHH:MM:SS"
    location = data.get('location')
    # total_capacity = data.get('total_capacity')
    # gold_price = data.get('gold_price')
    # silver_price = data.get('silver_price')
    # platinum_price = data.get('platinum_price')

    if not title or not description or not event_date or not location:
        return jsonify({'message': 'Missing required fields'}), 400

    try:
        event_date = datetime.fromisoformat(event_date)
    except ValueError:
        return jsonify({'message': 'Invalid date format'}), 400

    new_event = Event(
        musician_id=current_user.musician.musician_id,
        title=title,
        description=description,
        event_date=event_date,
        location=location,
        # total_capacity=total_capacity,
        # gold_price=gold_price,
        # silver_price=silver_price,
        # platinum_price=platinum_price,
    )

    db.session.add(new_event)
    db.session.commit()

    return jsonify({'message': 'Event created successfully'}), 201


@app.route('/posts/create', methods=['POST'])
def create_post():
    data = request.form  # Access form data

    content = data.get('content')
    user_id = data.get('user_id')

    if not content or not user_id:
        return jsonify({'message': 'Content and user_id are required fields'}), 400

    # Check if the user exists and is a musician (you can add more checks as per your application logic)
    musician = Musician.query.filter_by(user_id=user_id).first()
    if not musician:
        return jsonify({'message': 'User is not authorized to create posts'}), 403

    # Check if the request contains files
    if 'photo' not in request.files:
        return jsonify({'message': 'No file part'}), 400

    photo = request.files['photo']

    # If the user does not select a file, the browser submits an empty part without filename
    if photo.filename == '':
        return jsonify({'message': 'No selected file'}), 400

    # Check if the file extension is allowed
    if not allowed_file(photo.filename):
        return jsonify({'message': 'Invalid file extension'}), 400

    # Save the photo with a secure filename
    filename = secure_filename(photo.filename)
    photo_path = os.path.join(UPLOAD_FOLDER, filename)
    photo.save(photo_path)

    # Create a new post
    new_post = Post(
        user_id=user_id,
        content=content,
        photo_path=photo_path,  # Store the path to the uploaded photo
        created_at=datetime.now()
    )

    # Add the post to the database session
    db.session.add(new_post)
    db.session.commit()

    return jsonify({'message': 'Post created successfully', 'post_id': new_post.post_id}), 201


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


# @socketio.on('join')
# def on_join(data):
#     username = data['username']
#     room = data['room']
#     join_room(room)
#     emit('message', {'msg': f"{username} has entered the room."}, room=room)

# @socketio.on('leave')
# def on_leave(data):
#     username = data['username']
#     room = data['room']
#     leave_room(room)
#     emit('message', {'msg': f"{username} has left the room."}, room=room)

# @socketio.on('send_message')
# def handle_send_message_event(data):
#     app.logger.info("{} has sent message to the room {}: {}".format(data['username'], data['room'], data['message']))
#     emit('receive_message', data, room=data['room'])


if __name__ == '__main__':
    app.run(debug=True)
