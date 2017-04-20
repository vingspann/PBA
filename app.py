import os, flask, flask_socketio
from chatBot import bot
from user import user
oak = bot()


app = flask.Flask(__name__)
socketio = flask_socketio.SocketIO(app)

player = []
player.append(user())
player.append(user())
global usersConnected
usersConnected= 0


ii = 0
# This function will emit to CmdBtn to dynamically update the names of the moves
# This is necessary for switching pokemon

# Sets the players initial pokemon when they connect
def setPokemon():
    player[0].pokemon[0].nameSet('Pikachu')
    player[0].pokemon[0].moves('Thunderbolt','Slam','Iron Tail','Brick Break')
    player[0].pokemon[1].nameSet('Charazard')
    player[0].pokemon[1].moves('Wing Attack','Slash','Flamethrower','Dragon Claw')
    player[1].pokemon[0].nameSet('Dragonite')
    player[1].pokemon[0].moves('Wing Attack','Drangon Claw','Fire Punch','Aqua Tail')
    player[1].pokemon[1].nameSet('Scyther')
    player[1].pokemon[1].moves('Steel Wing','Night Slash','X-Scissor','Wing Attack')
    
    
# Helper function used by seperate socket Io calls
def updatePokemon(ID):
    # p stands for player number for the array
    # cp stands for current Pokemon. Saves a lot of typing
    # op stands for other player
    if ID == player[0].ID:
        p = 0
        op = 1
        cp = player[0].currentPokemon
    elif ID == player[1].ID:
        p = 1
        op = 0
        cp = player[1].currentPokemon
    else: 
        return
        
    # Updates the pokemon for the player that switched or called update info
    socketio.emit('updatePokemon', {
        'name'  : player[p].pokemon[cp].name,
        'move1' : player[p].pokemon[cp].move[0].name,
        'move2' : player[p].pokemon[cp].move[1].name,
        'move3' : player[p].pokemon[cp].move[2].name,
        'move4' : player[p].pokemon[cp].move[3].name,
        'curHealth' : player[p].pokemon[cp].currentHp,
        'maxHealth' : player[p].pokemon[cp].maxHp,
        'link' : player[p].pokemon[cp].spriteLink
    }, room=player[p].ID)
    
    # updates the opponents info of the updated info
    socketio.emit('updateOpPokemon', {
        'name' : player[p].pokemon[cp].name,
        'link' : player[p].pokemon[cp].spriteLink,
        'health' : player[p].pokemon[cp].percentHealth()
    }, room=player[op].ID)

@socketio.on('updateInfo')
def updateInfo():
    ID = flask.request.sid
    updatePokemon(ID)
    
    
@socketio.on('switch')
def switch():
    ID = flask.request.sid
    
    if ID == player[0].ID:
        p = 0
        cp = player[0].currentPokemon
    elif ID == player[1].ID:
        p = 1
        cp = player[1].currentPokemon
    else: 
        return
        
    if cp == 0:
        player[p].currentPokemon = 1
    elif cp == 1:
        player[p].currentPokemon = 0
        
    updatePokemon(ID)

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

@socketio.on('connect')
def on_connect():
    
    clientId = flask.request.sid
    # This makes it so when we do calls later we use this user number to update
    # the correct users page
    if usersConnected == 0:
        print "user 1 sid: " + clientId
        socketio.emit('connection', {'user' : 1}, room=clientId)
        player[0].ID = clientId
        global usersConnected
        usersConnected = 1
        
        
    elif usersConnected == 1:
        socketio.emit('connection', {'user' : 2}, room=clientId)
        print "user 2 sid: " + clientId
        player[1].ID = clientId
        global usersConnected
        usersConnected = 2
    else: 
        socketio.emit('connection', {'user' : 3})
    

if __name__ == '__main__':
    
    setPokemon()
    
    socketio.run(
            app,
            host=os.getenv('IP', '0.0.0.0'),
            port=int(os.getenv('PORT', 8080)),
            debug=True
        )
