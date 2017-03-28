import os, flask, flask_socketio, flask_sqlalchemy, requests, unirest
from rfc3987 import parse

app = flask.Flask(__name__)
socketio = flask_socketio.SocketIO(app)

import models

msg = []
fbUsers = []
gUsers = []

# https://market.mashape.com/ismaelc/yoda-speak


def chatbot(msgText, method):
    # Splits users message by spaces
    message = msgText.split()
    # Checks to see if they used the !! command
    # and checks to see if method is 0 which means a command
    if message[0] == "!!" and method == 0:
        if (message[1] == "about"):
            return "For jedi masters, this chatroom is!  Yes, hmmm."
        elif (message[1] == "help"):
            return "My commands, here are:  '!!  about', '!!  help;, '!!  say <something>', '!!  try', '!!  beauty', '!! yoda <write stuff here>'.  Yeesssssss."
        elif (message[1] == "yoda"):
            # Gets rid of the users name plus the say command
            yodacall = msgText[len(message[0]) + 5:]
            # Replaces spaces with + signs for api call
            yodacall.replace(" ", "+")
            response = unirest.get("https://yoda.p.mashape.com/yoda?sentence=" + yodacall,
                headers={
                    "X-Mashape-Key": os.getenv("yoda_key"),
                    "Accept": "text/plain"
                })
            return response.raw_body
        elif (message[1] == "try"):
            return "Do. Or do not. There is no try."
        elif (message[1] == "beauty"):
            return "When nine hundred years old you reach, look as good, you will not, hmmmm?"
        elif (message[1] == "say"):
            return msgText[len(message[0]) + 5:]
        else:
            return "I know not that command.  Use '!! help' For a list of my commands!"
    # If function called with a 1, it sends a welcome message. 
    elif method == 1:
        
        return 'Entered the room, ' + msgText + ' has. Yeesssssss.'
    
    elif method == 2:
        return 'Left the room, ' + msgText + ' has. Hmmm.'
        
    return ''

def bot(message, method):
    
    botmsg = chatbot(message, method)
    print botmsg
    print len(botmsg)
    if len(botmsg) > 0:
        dbEntry = models.Message(
            "https://www.sideshowtoy.com/photo.php?sku=400302",
            "YODABOT",
            botmsg,
            '',
            ''
        )
        models.db.session.add(dbEntry)
        models.db.session.commit()
        msg.append({
            'name': "YODABOT",
            'picture': "https://www.sideshowtoy.com/photo.php?sku=400302",
            'text': botmsg,
            'image': '',
            'link' : ''
        })
        socketio.emit('chat', {'messages' : msg}, broadcast=True)
        
# Checks for valid url
def checkForUrl(message):
    try:
        check = parse(message, rule='IRI')
        if check['scheme'] == 'https' or check['scheme'] == 'http':
            return True
        return False
    except:
        return False


# Simply adds a user to the user list
def addUser(name, pic, sid, method):
    if method == 0:
        fbUsers.append({
            'name': name,
            'picture': pic,
            'sid' : sid
        })
    else:
        gUsers.append({
            'name': name,
            'picture': pic,
            'sid' : sid
        })
    socketio.emit('users', {
        'fusers' : fbUsers,
        'gusers' : gUsers
    }, broadcast=True)

    
def processLinks(name, pic, link):
    end = len(link)-4
    if link[end:] == '.jpg' or link[end:] == '.png' or link[end:] == '.gif' or link[end-1:] == '.jpeg':
        image = link
        url = ''
    else:
        url = link
        image = ''
    
    dbEntry = models.Message(
        pic,
        name,
        '',
        image,
        url
    )
    models.db.session.add(dbEntry)
    models.db.session.commit()
    msg.append({
        'name': name,
        'picture': pic,
        'text': '',
        'image' : image,
        'link' : url
    })    

@app.route('/')
def hello():
    return flask.render_template('index.html')

@socketio.on('connect')
def on_connect():
    socketio.emit('users', {
        'fusers' : fbUsers,
        'gusers' : gUsers
    }, broadcast=True)
    socketio.emit('chat', {'messages' : msg})
    print 'Someone connected!'
    socketio.emit('connected', {
         'message': 'someone connected'
    })


@socketio.on('disconnect')
def on_disconnect():
    
    socketio.emit('disconnected', {
        'message' : 'someone disconnected'
    })
    for f in fbUsers:
        if f['sid'] == flask.request.sid:
            bot(f['name'], 2)
            fbUsers.remove(f)
            
    
    for g in gUsers:
        if g['sid'] == flask.request.sid:
            bot(g['name'], 2)
            gUsers.remove(g)
    
            
    
    socketio.emit('users', {
        'fusers' : fbUsers,
        'gusers' : gUsers
    }, broadcast=True)
    
    print 'Someone disconnected!'
    

@socketio.on('submit')
def on_submit(data):
   
    if (len(data['facebook_user_token']) != 0 or len(data['google_user_token']) != 0):
        picture = ''
        if (data['google_user_token'] == ''):
            response = requests.get('https://graph.facebook.com/v2.8/me?fields=id%2Cname%2Cpicture&access_token=' + data['facebook_user_token'])
            json = response.json()
            picture = json['picture']['data']['url']
            new = True;
            for person in fbUsers:
                if json['name'] == person['name']:
                    new = False;
            if new:
                addUser(json['name'], picture, flask.request.sid, 0)
                bot(json['name'], 1)
        elif (data['facebook_user_token'] == ''):
            response = requests.get('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' + data['google_user_token'])
            json = response.json()
            picture = json['picture']
            new = True;
            for person in gUsers:
                if json['name'] == person['name']:
                    new = False;
            if new:
                addUser(json['name'], picture, flask.request.sid, 1)
                bot(json['name'], 1)
            
            
                
        if checkForUrl(data['text']):
            processLinks(json['name'], picture, data['text'])
            
        else:
            dbEntry = models.Message(
                picture,
                json['name'],
                data['text'],
                '',
                ''
            )
            models.db.session.add(dbEntry)
            models.db.session.commit()
            msg.append({
                'name': json['name'],
                'picture': picture,
                'text': data['text'],
                'image' : '',
                'link' : ''
            })
        
        socketio.emit('chat', {'messages' : msg}, broadcast=True)
        bot(data['text'],0)

    
if __name__ == '__main__':
    messages = models.Message.query.all()
    for m in messages:
        msg.append({
            'name': m.name,
            'picture': m.pic,
            'text': m.text,
            'image' : m.image,                
            'link' : m.link
        })
    socketio.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=int(os.getenv('PORT', 8080)),
        debug=True
    )


