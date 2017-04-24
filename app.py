import os, flask, flask_socketio, time
from random import randint
from threading import Timer
from chatBot import bot
from user import user
oak = bot()


app = flask.Flask(__name__)
socketio = flask_socketio.SocketIO(app)

player = [user(), user()]

# this is where the battle and turns will happen
def battle():
    
    # This ensures they can't switch pokemon until the lock is lifted at end of function
    player[0].lockSwitch = True
    player[1].lockSwitch = True
    
    p1 = player[0].currentPokemon
    p2 = player[1].currentPokemon
    m1 = player[0].recentMove
    m2 = player[1].recentMove
    fText = ''
    sText = ''
    
    #fast pokemon and slow pokemon
    fPoke = None
    sPoke = None
    
    # This is needed to remember who the pokemon belong to
    f = 0
    s = 1
    # this makes it so I don't need to worry about dealing with player arrays
    # as well as making it so no other emits change the locked in moves
    if player[0].pokemon[p1].getSpeed() > player[1].pokemon[p2].getSpeed():
        fPoke = p1
        sPoke = p2
        fm = m1
        sm = m2
    else:
        fPoke = p2
        sPoke = p1
        fm = m2
        sm = m1
        f = 1
        s = 0
        
    # sets Attack and defense to special or physical depending on move type
    if player[f].pokemon[fPoke].move[fm].damageClass == 'physical':
        attack = player[f].pokemon[fPoke].getAttack()
        defense = player[s].pokemon[sPoke].getDefense()
    elif player[f].pokemon[fPoke].move[fm].damageClass == 'special':
        attack = player[f].pokemon[fPoke].getSpAtk()
        defense = player[s].pokemon[sPoke].getSpDef()
    
    # simple modifer for now.    
    modifier = randint(85, 100) / 100.0
    
    # this is to clean up the line below
    levelMod = ((2 * 52) / 5) + 2
    # damage calculation
    damage = (((levelMod * player[f].pokemon[fPoke].move[fm].attackPower * (attack/defense))/ 50) + 2) * modifier   
    
    # text for the fast pokemon's emit
    fText = player[f].pokemon[fPoke].name + " dealt " + str(damage) + " damage to " + player[s].pokemon[sPoke].name + "."
    
    player[s].pokemon[sPoke].dealDamage(damage)
    # Checks to see if the pokemon has feinted or not. If not it does a normal move,
    # else, if the pokemon feints it sets the slow pokemon's message to reflect the feint
    if player[s].pokemon[sPoke].currentHp > 0:
        # sets Attack and defense to special or physical depending on move type
        if player[s].pokemon[sPoke].move[sm].damageClass == 'physical':
            attack = player[s].pokemon[sPoke].getAttack()
            defense = player[f].pokemon[fPoke].getDefense()
        elif player[s].pokemon[sPoke].move[sm].damageClass == 'special':
            attack = player[s].pokemon[sPoke].getSpAtk()
            defense = player[f].pokemon[fPoke].getSpDef()
        
        # simple modifer for now.    
        modifier = randint(85, 100) / 100.0
        
        # this is to clean up the line below
        levelMod = ((2 * 52) / 5) + 2
        # damage calculation
        damage = (((levelMod * player[s].pokemon[sPoke].move[sm].attackPower * (attack/defense))/ 50) + 2) * modifier   
        
        # text for the fast pokemon's emit
        sText = player[s].pokemon[sPoke].name + " dealt " + str(damage) + " damage to " + player[f].pokemon[fPoke].name + "."
        
        player[f].pokemon[fPoke].dealDamage(damage)
    else:
        sText = player[s].pokemon[sPoke].name + " has feinted."
        battleSwitch(s, sPoke)
        player[s].pokemonLeft = player[s].pokemonLeft - 1
    
    # This will be used to update YoPokemon to display health properly
    socketio.emit('battleUpdate', {'curHealth' : player[f].pokemon[fPoke].percentHealth(),
        'opHealth' : player[s].pokemon[sPoke].percentHealth()
    }, room=player[f].ID)
    socketio.emit('battleUpdate', {'curHealth' : player[s].pokemon[sPoke].percentHealth(),
        'opHealth' : player[f].pokemon[fPoke].percentHealth()
    }, room=player[s].ID)
    
    
    socketio.emit('battleLogEmit', {'text' : fText})
    socketio.emit('battleLogEmit', {'text' : sText})
    
    if (player[f].pokemon[fPoke].currentHp == 0):
        fText = player[f].pokemon[fPoke].name + " has feinted."
        socketio.emit('battleLogEmit', {'text' : fText})
        battleSwitch(f, fPoke)
        player[f].pokemonLeft = player[f].pokemonLeft - 1

    player[0].lockSwitch = False
    player[1].lockSwitch = False
    
    if player[0].pokemonLeft != 0 and player[1].pokemonLeft != 0: 
    
        # Leave this at the bottom, but you might want to add an if statement
        # so that when the game finishes, these two lines don't keep getting called.
        t = Timer( 10, battle)
        t.start()

# This is a helper funtion for the battle to force a pokemon switch when they feint
def battleSwitch(p, cp):
    if cp == 0:
        cp = 1
    else:
        cp = 0
        
    player[p].currentPokemon = cp
    updatePokemon(player[p].ID)

# This function will emit to CmdBtn to dynamically update the names of the moves
# This is necessary for switching pokemon

# Sets the players initial pokemon when they connect
def setPokemon():
    player[0].pokemon[0].nameSet('Pikachu')
    player[0].pokemon[0].buildMoves('Thunderbolt','Slam','Iron Tail','Brick Break')
    player[0].pokemon[0].buildPokemon()
    player[0].pokemon[0].percentHealth()
    player[0].pokemon[1].nameSet('Charizard')
    player[0].pokemon[1].buildMoves('Wing Attack','Slash','Flamethrower','Dragon Claw')
    player[0].pokemon[1].buildPokemon()
    player[0].pokemon[1].percentHealth()
    player[1].pokemon[0].nameSet('Dragonite')
    player[1].pokemon[0].buildMoves('Wing Attack','Dragon Claw','Fire Punch','Aqua Tail')
    player[1].pokemon[0].buildPokemon()
    player[1].pokemon[0].percentHealth()
    player[1].pokemon[1].nameSet('Scyther')
    player[1].pokemon[1].buildMoves('Steel Wing','Night Slash','X-Scissor','Wing Attack')
    player[1].pokemon[1].buildPokemon()
    player[1].pokemon[1].percentHealth()
    
# Helper function used by seperate socket Io calls
def updatePokemon(ID):
    # p stands for player number for the array
    # cp stands for current Pokemon. Saves a lot of typing
    # op stands for other player
    if ID == player[0].ID:
        p = 0
        op = 1
        cp = player[0].currentPokemon
        ocp = player[1].currentPokemon
    elif ID == player[1].ID:
        p = 1
        op = 0
        cp = player[1].currentPokemon
        ocp = player[0].currentPokemon
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
        'link' : player[p].pokemon[cp].spriteLink,
        'opName' : player[op].pokemon[ocp].name,
        'opLink' : player[op].pokemon[ocp].spriteLink,
        'opLealth' : player[op].pokemon[ocp].percentHealth()
    }, room=player[p].ID)
    
    # updates the opponents info of the updated info
    socketio.emit('updateOpPokemon', {
        'name' : player[p].pokemon[cp].name,
        'link' : player[p].pokemon[cp].spriteLink,
        'health' : player[p].pokemon[cp].percentHealth()
    }, room=player[op].ID)
    updateSpectator()
    
def updateSpectator():
    cp1 = player[0].currentPokemon
    cp2 = player[1].currentPokemon
    socketio.emit('updateSpectator', {
        'nameP1' : player[0].pokemon[cp1].name,
        'healthP1' : player[0].pokemon[cp1].percentHealth(),
        'linkP1' : player[0].pokemon[cp1].spriteLink,
        'nameP2' : player[1].pokemon[cp2].name,
        'healthP2' : player[1].pokemon[cp2].percentHealth(),
        'linkP2' : player[1].pokemon[cp2].spriteLink
        
    }, room='spectator')
   
@socketio.on('CM')
def updateCurrentMove(data):
    ID = flask.request.sid
    
    if ID == player[0].ID:
        p = 0
    elif ID == player[1].ID:
        p = 1
    else: 
        return
    
    player[p].recentMove = data['CM'];


@socketio.on('updateInfo')
def updateInfo():
    ID = flask.request.sid
    updatePokemon(ID)
    
    
@socketio.on('switch')
def switch(data):
    ID = flask.request.sid
    
    if ID == player[0].ID:
        p = 0
    elif ID == player[1].ID:
        p = 1
    else: 
        return
    
    # If they are not locked, they can switch pokemon
    if not player[p].lockSwitch:
    
        # The pokemon numebrs come in starting at 1. So, it's needed to subtract 1 to get it 
        # to be proper array indexs 
        player[p].currentPokemon = data['currentPokemon'] - 1
            
        updatePokemon(ID)
    

@app.route('/')
def hello():
    return flask.render_template('index.html', facebook_key = os.environ['FBKEY'])
    
@socketio.on('chatLogSubmit')
def chatLogSubmit(data):
    print data
    socketio.emit('chatLogEmit', {'name' : data['name'], 'text' : data['text']})
    allow, message = oak.check(data['text'])
    if allow:
        if message == "1337":
            cp1 = player[0].currentPokemon
            cp2 = player[1].currentPokemon
            types = player[0].pokemon[cp1].name + " is "
            
            if player[0].pokemon[cp1].type2 != None:
                types = types + player[0].pokemon[cp1].type1
                types = types + " and " + player[0].pokemon[cp1].type2
            else:
                types = types + player[0].pokemon[cp1].type1
            types = types + "type."
            socketio.emit('chatLogEmit', {'name' : oak.name, 'text' : types})
            
            types = player[1].pokemon[cp2].name + " is "
            
            if player[1].pokemon[cp2].type2 != None:
                types = types + player[1].pokemon[cp2].type1
                types = types + " and " + player[1].pokemon[cp2].type2
            else:
                types = types + player[1].pokemon[cp2].type1
            types = types + "type."
            socketio.emit('chatLogEmit', {'name' : oak.name, 'text' : types})
            
        else:
            socketio.emit('chatLogEmit', {'name' : oak.name, 'text': message})


@socketio.on('battleLog')
def battleLog(data):
    socketio.emit('battleLogEmit', {'text' : data['text']})

@socketio.on('connect')
def on_connect():
    
    clientId = flask.request.sid
    # This makes it so when we do calls later we use this user number to update
    # the correct users page
    if player[0].ID == None:
        print "user 1 sid: " + clientId
        socketio.emit('connection', {'user' : 1}, room=clientId)
        player[0].ID = clientId
        
    elif player[1].ID == None:
        socketio.emit('connection', {'user' : 2}, room=clientId)
        print "user 2 sid: " + clientId
        player[1].ID = clientId
        
        # This makes it so that there is a timer before the battle starts.
        # This stops an attack from happening as soon as both people log in.
        t = Timer(20, battle)
        t.start()
        
    else: 
        flask_socketio.join_room('spectator')
        socketio.emit('connection', {'user' : 3}, room='spectator')
        updateSpectator()
    

if __name__ == '__main__':
    
    setPokemon()
    socketio.run(
            app,
            host=os.getenv('IP', '0.0.0.0'),
            port=int(os.getenv('PORT', 8080)),
            debug=True
        )
