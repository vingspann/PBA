import os, flask, flask_socketio
from chatBot import bot
from character import pokemon
from user import user
oak = bot()
pokemon = pokemon()
player = []
player.append(user())
player.append(user())


app = flask.Flask(__name__)
socketio = flask_socketio.SocketIO(app)
i = 0
ii = 0
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
    ################################# hard coded to 1
    user = 1
    if(user == 1):
        global i
        # default pokemon pikachu
        def primaryChar():
            pokemon.nameSet('Pikachu')
            pokemon.moves('Thunderbolt','Slam','Iron Tail','Brick Break')
            pokemon.sprite('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png')
        # after switch button is clicked seconary pokemon charzard
        def secondaryChar():
            pokemon.nameSet('Charazard')
            pokemon.moves('Wing Attack','Slash','Flamethrower','Dragon Claw')
            pokemon.sprite('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png')
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
    else:
        global ii 
        # default pokemon pikachu
        def primaryChar():
            pokemon.nameSet('Dragonite')
            pokemon.moves('Wing Attack','Drangon Claw','Fire Punch','Aqua Tail')
        def secondaryChar():
            pokemon.nameSet('Scyther')
            pokemon.moves('Steel Wing','Night Slash','X-Scissor','Wing Attack')
        if(ii%2 == 1):
            primaryChar()
        else:
            secondaryChar()
        ii=ii+1
        print (ii)
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