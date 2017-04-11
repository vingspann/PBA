import os, flask, flask_socketio
from chatBot import bot
from character import pokemon
oak = bot()
pokemon = pokemon()


app = flask.Flask(__name__)
socketio = flask_socketio.SocketIO(app)
i = 0

# This function will emit to CmdBtn to dynamically update the names of the moves
# This is necessary for switching pokemon

@socketio.on('updateMoves')
def updateMoves():
    socketio.emit('updateMoves', {
        'name'  : pokemon.name,
        'move1' : pokemon.move[0].name,
        'move2' : pokemon.move[1].name,
        'move3' : pokemon.move[2].name,
        'move4' : pokemon.move[3].name
    })
    
@socketio.on('switch')
def switch():
    global i
    # default pokemon pikachu
    def primaryChar():
        pokemon.nameSet('Pikachu')
        pokemon.moves('Thunderbolt','Tail Whip','Iron Tail','Play Nice')
    # after switch button is clicked seconary pokemon charzard
    def secondaryChar():
        pokemon.nameSet('Charazard')
        pokemon.moves('Ember','Slash','Flamethrower','Hyper Beam')
    if(i%2 == 1):
        primaryChar()
    else:
        secondaryChar()
    i=i+1
    print (i)
    socketio.emit('updateMoves', {
        'name'  : pokemon.name,
        'move1' : pokemon.move[0].name,
        'move2' : pokemon.move[1].name,
        'move3' : pokemon.move[2].name,
        'move4' : pokemon.move[3].name
    })



@app.route('/')
def hello():
    return flask.render_template('index.html')
    
@socketio.on('chatLogSubmit')
def chatLogSubmit(data):
    print data
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