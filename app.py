import os, flask, flask_socketio

app = flask.Flask(__name__)
socketio = flask_socketio.SocketIO(app)



@app.route('/')
def hello():
    return flask.render_template('index.html')
    
@socketio.on('chatLogSubmit')
def chatLogSubmit(data):
    socketio.emit('chatLogEmit', {'name' : data['name'], 'text' : data['text']})
    #send data to chatbot to respond with commands

socketio.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=int(os.getenv('PORT', 8080)),
        debug=True
    )