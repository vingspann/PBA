import os, flask, flask_socketio, time
from random import randint
from chatBot import bot
from user import user
from pokeType import pokeType

oak = bot()

#building a global list of types for determining
#damage in the Battle logic
types = []
for i in range(18):
    types.append(pokeType())

app = flask.Flask(__name__)
socketio = flask_socketio.SocketIO(app)

player = [user(), user()]
userList = {}
i = 0

def startup():
    setTypes()
    setPokemon()

# this is where the battle and turns will happen
def battle():
    
    # initial if statement so computer skips code section with least amount of checks
    if player[0].recentMove == 6 or player[1].recentMove == 6:
        if player[0].recentMove == 6 and player[1].recentMove == 6:
            endBattle(0, 1, 2) # w, l, method. check function for method numbers
        elif player[0].recentMove == 6:
            endBattle(1, 0, 1) # w, l, method. check function for method numbers
        elif player[1].recentMove == 6:
            endBattle(0, 1, 1) # w, l, method. check function for method numbers
        # if either player surrenders this ends the battle sequence.
        return
    
    
    p1 = player[0].currentPokemon
    p2 = player[1].currentPokemon
    m1 = player[0].recentMove
    m2 = player[1].recentMove
    #fast pokemon and slow pokemon
    fPoke = None
    sPoke = None
    fTurn = True
    sTurn = True
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
    
    # if the player chose to switch, it switches the pokemon and updates info
    # from fPoke to the react components
    # fturn makes it so, if they chose to switch, then they don't take an attack
    if player[f].recentMove == 5:
        battleSwitch(f, 1)
        fPoke = player[f].currentPokemon
        updatePokemon(player[f].ID)
        fTurn = False
    
    if player[s].recentMove == 5:
        battleSwitch(s, 1)
        sPoke = player[s].currentPokemon
        updatePokemon(player[s].ID)
        sTurn = False
    
    # If they didn't switch, then they can attack
    if fTurn:
        # If the slow pokemon fainted, then battleDamage returns false
        # this makes it so the slow pokemon's team can't attack
        sTurn = battleDamage(f, fPoke, fm, s, sPoke, sm)
    
    # If they didn't switch and didn't faint, then they can attack
    if sTurn:
        battleDamage(s, sPoke, sm, f, fPoke, fm)

    fPoke = player[f].currentPokemon
    sPoke = player[s].currentPokemon
    
    # This will be used to update YoPokemon to display health properly
    socketio.emit('battleUpdate', {'curHealth' : player[f].pokemon[fPoke].percentHealth(),
        'opHealth' : player[s].pokemon[sPoke].percentHealth()
    }, room=player[f].ID)
    socketio.emit('battleUpdate', {'curHealth' : player[s].pokemon[sPoke].percentHealth(),
        'opHealth' : player[f].pokemon[fPoke].percentHealth()
    }, room=player[s].ID)
    
    # Updates each players pokeballs so it shows the current health of pokemon in them
    updatePokeballs(player[0].ID)
    updatePokeballs(player[1].ID)
    
    # Lets them select a new move for the next turn.
    player[0].lockMove = False
    player[1].lockMove = False
    if player[0].pokemonLeft == 0 or player[1].pokemonLeft == 0: 
    
        # Defaults to player 0 winner. Changes if they lost
        # w stands for winner, l stands for loser
        w = 0
        l = 1
        if player[0].pokemonLeft == 0:
            w = 1
            l = 0
    
        # Sends the winner and losers number to the ending function
        endBattle(w, l, 0)
        
# Helper function to make battle function less repetative
def battleDamage(p, cp, m, op, ocp, om):
    # p = player, cp = p's current pokemon, m = p's recent move
    # op = other player, ocp = other's current pokemon, om = op's recent move
    
    text3 = "na"

    # sets Attack and defense to special or physical depending on move type
    if player[p].pokemon[cp].move[m].damageClass == 'physical':
        attack = player[p].pokemon[cp].getAttack()
        defense = player[op].pokemon[ocp].getDefense()
    elif player[p].pokemon[cp].move[m].damageClass == 'special':
        attack = player[p].pokemon[cp].getSpAtk()
        defense = player[op].pokemon[ocp].getSpDef()
    
    # Checking for Super/Not Very/No Effect modifiers
    modifier = getBattleModifier(p, cp, m, op, ocp, om)
    if modifier >= 2:
        text3 = "It's super effective!"
    elif modifier < 1 and modifier > 0:
        text3 = "It's not very effective..."
    elif modifier == 0:
        text3 = "It had no effect!"
    
    #STAB modifier check
    if player[p].pokemon[cp].move[m].moveType == player[p].pokemon[cp].type1 or player[p].pokemon[cp].move[m].moveType == player[p].pokemon[cp].type2:
        modifier = modifier * 1.5
        
    #Random distribution number (85% - 100% of damage)
    modifier = modifier * (randint(85, 100) / 100.0)
    
    # damage calculation
    damage = (((22.0 * player[p].pokemon[cp].move[m].attackPower * (float(attack)/float(defense)))/ 50.0) + 2) * modifier
    
    # This keeps damages to whole numbers
    damage = int(damage)
    
    # text for the fast pokemon's emit
    text = player[p].pokemon[cp].name + " used " + player[p].pokemon[cp].move[m].name + "."
    text2 = player[op].pokemon[ocp].name + " took " + str(damage) + " damage."
    
    player[op].pokemon[ocp].dealDamage(damage)
    
    socketio.emit('battleLogEmit', {'text' : text})
    socketio.emit('battleLogEmit', {'text' : text2})
    if text3 != "na":
        socketio.emit('battleLogEmit', {'text' : text3})
    
    if player[op].pokemon[ocp].currentHp == 0:
        text3 = player[op].pokemon[ocp].name + " has fainted."
        socketio.emit('battleLogEmit', {'text' : text3})
        battleSwitch(op, 0)
        player[op].pokemonLeft = player[op].pokemonLeft - 1
        return False
    elif om == 5:
        return False
    return True


#this returns the correct modifier to be applied to battle damage with respect to
#super effective, not very effective, no effect, and/or STAB modifiers
def getBattleModifier(p, cp, m, op, ocp, om):
    modifier = 1.0
    for attackType in types:
        if player[p].pokemon[cp].move[m].moveType == attackType.name:
            for checkType in attackType.superEffective:
                if player[op].pokemon[ocp].type1 == checkType or player[op].pokemon[ocp].type2 == checkType:
                    modifier = modifier * 2
                    print "super!"
            for checkType in attackType.notVeryEffective:
                if player[op].pokemon[ocp].type1 == checkType or player[op].pokemon[ocp].type2 == checkType:
                    modifier = modifier * 0.5
                    print "nve..."
            for checkType in attackType.noDamage:
                if player[op].pokemon[ocp].type1 == checkType or player[op].pokemon[ocp].type2 == checkType:
                    modifier = modifier * 0  
                    print "nada"

    print "I'm filler text to be sure this function is called"
    return modifier
        
# This is a helper funtion for the battle to force a pokemon switch when they faint
# Method is used for whether it's a death (0) or a user switching(1)
def battleSwitch(p, method):
    
    if player[p].pokemonLeft != 0 and method == 0:
        for i in range(4):
            if player[p].pokemon[i].currentHp > 0:
                player[p].currentPokemon = i
                updatePokemon(player[p].ID)
                return
    else:
        player[p].currentPokemon = player[p].switchPokemon
        updatePokemon(player[p].ID)
        
# Gave this section its own function to make surrendering easier to code
# Method gets 0 for battle loss, and 1 for single surrender
# Method gets 2 for double surrender
def endBattle(w, l, method):
    
    if method == 0:
        wMsg = "Congratulations! You won with " + player[w].pokemon[0].name + " and " + player[w].pokemon[1].name + "."
        lMsg = "Oh no! You lost with " + player[l].pokemon[0].name + " and " + player[l].pokemon[1].name + "."
        specMsg = "Player " + str(w + 1) + " won with their team of " + player[w].pokemon[0].name + " and " + player[w].pokemon[1].name + "."
    elif method == 1:
        wMsg = "You Win! Player " + str (l + 1) + " chose to surrender."
        lMsg = "You lose. You chose to surrender. "
        specMsg = "Player " + str(w + 1) + " wins. Player " + str (l + 1) + " surrendered."
    elif method == 2:
        wMsg = "It's a draw! You both surrendered."
        lMsg = wMsg
        specMsg = "Battle ended in a draw. Both players surrendered."
    print "win emits"
    # Emits a seperate msg to each player, and all spectators get the same message
    socketio.emit('battleLogEmit', {'text' : wMsg}, room=player[w].ID)
    socketio.emit('battleLogEmit', {'text' : lMsg}, room=player[l].ID)
    socketio.emit('battleLogEmit', {'text' : specMsg}, room='spectator')
    reset()

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
  
# Builds all of the types for effective bonuse  
def setTypes():
    types[0].setName("normal")
    types[0].buildType()
    types[1].setName("fire")
    types[1].buildType()
    types[2].setName("fighting")
    types[2].buildType()
    types[3].setName("water")
    types[3].buildType()
    types[4].setName("flying")
    types[4].buildType()
    types[5].setName("grass")
    types[5].buildType()
    types[6].setName("poison")
    types[6].buildType()
    types[7].setName("electric")
    types[7].buildType()
    types[8].setName("ground")
    types[8].buildType()
    types[9].setName("psychic")
    types[9].buildType()
    types[10].setName("rock")
    types[10].buildType()
    types[11].setName("ice")
    types[11].buildType()
    types[12].setName("bug")
    types[12].buildType()
    types[13].setName("dragon")
    types[13].buildType()
    types[14].setName("ghost")
    types[14].buildType()
    types[15].setName("dark")
    types[15].buildType()
    types[16].setName("steel")
    types[16].buildType()
    types[17].setName("fairy")
    types[17].buildType()

# Helper function used by seperate socket Io calls
def updatePokemon(ID):
    global i 
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
        'health' : player[p].pokemon[cp].percentHealth(),
        'link' : player[p].pokemon[cp].spriteLink,
        'opName' : player[op].pokemon[ocp].name,
        'opLink' : player[op].pokemon[ocp].spriteLink,
        'opHealth' : player[op].pokemon[ocp].percentHealth()
    }, room=player[p].ID)
    if(i >3):
        # updates the opponents info of the updated info
        socketio.emit('updateOpPokemon', {
            'name' : player[p].pokemon[cp].name,
            'link' : player[p].pokemon[cp].spriteLink,
            'health' : player[p].pokemon[cp].percentHealth()
        }, room=player[op].ID)
    i = i + 1
    
    updatePokeballs(ID)
    updateSpectator()
    
def updatePokeballs(ID):
    # p stands for player number for the array
    if ID == player[0].ID:
        p = 0
    elif ID == player[1].ID:
        p = 1
    else: 
        return
  # pushes both pokemon
    socketio.emit('getBothPokemon', {
        'health0' : player[p].pokemon[0].percentHealth(),
        'link0' : player[p].pokemon[0].spriteLink,
        'health1' : player[p].pokemon[1].percentHealth(),
        'link1' : player[p].pokemon[1].spriteLink
    }, room=player[p].ID)  
    
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
    
# Resets the room. Called with chat bot and end of battle
def reset():
    flask_socketio.join_room('spectator', sid=player[0].ID)
    flask_socketio.join_room('spectator', sid=player[1].ID)
    socketio.emit('connection', {'user' : 3}, room='spectator')
    player[0].reset()
    player[1].reset()
    updateSpectator()
    i = 0
    
@socketio.on('confirmMove')
def confirmMove():
    ID = flask.request.sid
    
    if ID == player[0].ID:
        p = 0
    elif ID == player[1].ID:
        p = 1
    else: 
        return
    
    player[p].lockMove = True
    if player[0].lockMove and player[1].lockMove:
        battle()
    
@socketio.on('CM')
def updateCurrentMove(data):
    
    ID = flask.request.sid
    
    if ID == player[0].ID:
        p = 0
    elif ID == player[1].ID:
        p = 1
    else: 
        return
    
    if not player[p].lockMove:
    
        player[p].recentMove = data['CM']
        # Locks their move if they choose to switch pokemon
        if data['CM'] == 5:
            # Sets their current pokemon to the new pokemon. This is needed for
            # the battle function
            player[p].switchPokemon = data['currentPokemon'] - 1
            player[p].lockMove = True
        
        if player[0].lockMove and player[1].lockMove:
            battle()
        
@socketio.on('updateInfo')
def updateInfo():
    ID = flask.request.sid
    updatePokemon(ID)
    updatePokeballs(ID)

@app.route('/')
def hello():
    return flask.render_template('index.html', facebook_key = os.environ['FBKEY'])
    
@socketio.on('chatLogSubmit')
def chatLogSubmit(data):
    print data
    ID = flask.request.sid
    name = 'Anon'
    if (ID in userList):
        name = userList[ID]

    
    allow, bot, message = oak.check(data['text'])
    
    # Determines whether or not users message will be displayed
    if allow:
        socketio.emit('chatLogEmit', {'name' : name, 'text' : data['text']})
    
    if bot:
        if message == "1337":
            cp1 = player[0].currentPokemon
            cp2 = player[1].currentPokemon
            types = player[0].pokemon[cp1].name + " is "
            
            if player[0].pokemon[cp1].type2 != None:
                types = types + player[0].pokemon[cp1].type1
                types = types + " and " + player[0].pokemon[cp1].type2
            else:
                types = types + player[0].pokemon[cp1].type1
            types = types + " type."
            socketio.emit('chatLogEmit', {'name' : oak.name, 'text' : types})
            
            types = player[1].pokemon[cp2].name + " is "
            
            if player[1].pokemon[cp2].type2 != None:
                types = types + player[1].pokemon[cp2].type1
                types = types + " and " + player[1].pokemon[cp2].type2
            else:
                types = types + player[1].pokemon[cp2].type1
            types = types + " type."
            socketio.emit('chatLogEmit', {'name' : oak.name, 'text' : types})
        
        elif message == "1212":
            reset()
            
        else:
            socketio.emit('chatLogEmit', {'name' : oak.name, 'text': message})

@socketio.on('FBInfo')
def onFBInfo(data):
    ID = flask.request.sid
    print "chat Id:  " + ID
    name = data['name']
    print "name:  " + name
    userList[ID] = name
    
@socketio.on('battleLog')
def battleLog(data):
    socketio.emit('battleLogEmit', {'text' : data['text']})
  
# overrides users choice if they chose to surrender.   
@socketio.on('surrender')
def surrender():
    ID = flask.request.sid
    if ID == player[0].ID:
        p = 0
    elif ID == player[1].ID:
        p = 1
    else: 
        return
    
    
    # There is no if-statement here incase they decide to surrender before
    # the other player takes their turn. This would override their current move
    player[p].recentMove = 6
    player[p].lockMove = True
    
    if player[0].lockMove and player[1].lockMove:
        battle()
    
    
@socketio.on('connect')
def on_connect():
    
    flask_socketio.join_room('spectator')
    socketio.emit('connection', {'user' : 3}, room='spectator')
    updateSpectator()

@socketio.on('joinGame')
def joinGame():
    ID = flask.request.sid
    
    # This makes users leave the spectator mode and join the player mode
    # if there is an open spot.
    if player[0].ID == None:
        print "user 1 sid: " + ID
        flask_socketio.leave_room('spectator')
        socketio.emit('connection', {'user' : 1}, room=ID)
        player[0].ID = ID
        updatePokemon(ID)
        
    elif player[1].ID == None:
        socketio.emit('connection', {'user' : 2}, room=ID)
        flask_socketio.leave_room('spectator')
        print "user 2 sid: " + ID
        player[1].ID = ID
        updatePokemon(ID)
    else:
        socketio.emit('gameFull')

if __name__ == '__main__':
    
    
    socketio.run(
            app,
            host=os.getenv('IP', '0.0.0.0'),
            port=int(os.getenv('PORT', 8080)),
            debug=True
        )
    startup()
