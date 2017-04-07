import os, flask, flask_socketio
from chatBot import bot
from character import pokemon
oak = bot()
pokemon = pokemon()

app = flask.Flask(__name__)
socketio = flask_socketio.SocketIO(app)


# This function will emit to CmdBtn to dynamically update the names of the moves
# This is necessary for switching pokemon

@socketio.on('updateMoves')
def updateMoves():
    socketio.emit('updateMoves', {
        'move1' : pokemon.move1,
        'move2' : pokemon.move2,
        'move3' : pokemon.move3,
        'move4' : pokemon.move4
    })



@app.route('/')
def hello():
    return flask.render_template('index.html')
    
@socketio.on('chatLogSubmit')
def chatLogSubmit(data):
    socketio.emit('chatLogEmit', {'name' : data['name'], 'text' : data['text']})
    allow, message = oak.check(data['text'])
    if allow:
        socketio.emit('chatLogEmit', {'name' : oak.name, 'text': message})


@socketio.on('battleLog')
def battleLog(data):
    socketio.emit('battleLogEmit', {'text' : data['text']})


socketio.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=int(os.getenv('PORT', 8080)),
        debug=True
    )