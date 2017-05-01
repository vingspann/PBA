import requests

class attack():
    def __init__(self):
        self.name = ''
        self.PP = 0
        self.currentPP = 0
        self.moveType = ''
        self.accuracy = 0
        self.status = ''
        self.statusChance = 0
        self.damageClass = ''
        self.attackPower = 0
    
    #calls the PokeAPI to determine info based on the moves provided
    #in hardcoded lines until we develop a "select moves" page or
    #function using more in-depth API calls (very much desired)
    def buildAttack(self):
        #build a request string to ping the API for the move data
        #replacing spaces with "-" and shifting all characters to lower case
        requestString = "http://pokeapi.co/api/v2/move/"
        searchName = self.name.replace(" ", "-")
        requestString += str(searchName).lower()
        response = requests.get(requestString)
        data = response.json()
        
        #use the API data to apply changes to the move in question
        self.PP = data["pp"]
        self.currentPP = self.PP
        self.moveType = data["type"]["name"]
        self.accuracy = data["accuracy"]
        self.damageClass = data["damage_class"]["name"]
        self.attackPower = data["power"]
        
    #this function sets the name of the move for hardcoded Pokemon now,
    #but will ideally be used when moves are selected in a more advanced
    #implementation of the app
    def setName(self, name):
        self.name = name