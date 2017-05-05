from statistic import statistic
from move import attack

import requests

class character():
    
    def __init__(self):
        self.name = ""
        self.type1 = ""
        self.type2 = None
        self.move = []
        self.stat = []
        self.maxHp = 100
        self.currentHp = 100
        self.percent = 1.0
        for i in range(4):
            self.move.append(attack())
        for i in range(6):
            self.stat.append(statistic())
        
        self.move[0].setName("Thunderbolt")
        self.move[1].setName("Tail Whip")
        self.move[2].setName("Iron Tail")
        self.move[3].setName("Play Nice")
        
        self.stat[0].setName("Speed")
        self.stat[1].setName("Special Defense")
        self.stat[2].setName("Special Attack")
        self.stat[3].setName("Defense")
        self.stat[4].setName("Attack")
        self.stat[5].setName("Hit Points")
        
        self.spriteLink = "http://i.imgur.com/TqM3EyY.jpg"
        
    #sets the name of the Pokemon in hardcoded lines, ideally will be done
    #when a Pokemon is selected by a player in a more advanced implementation
    def nameSet(self, name):
        self.name = name
          
    #takes the hardcoded names for moves, sets the names for the four moves in
    #the Pokemon/character object, and then uses the name to build the attack
    #with information from API calls in the buildAttack() function in move.py
    def buildMoves(self, move1, move2, move3, move4):
          self.move[0].setName(move1)
          self.move[0].buildAttack()
          self.move[1].setName(move2)
          self.move[1].buildAttack()
          self.move[2].setName(move3)
          self.move[2].buildAttack()
          self.move[3].setName(move4)
          self.move[3].buildAttack()
          
    #Called to update the Hit Point bars of Pokemon in battle, and returns the
    #value so that the HP bars can be properly updated.
    def percentHealth(self):
        self.percent = (float(self.currentHp)/float(self.maxHp))
        return self.percent
    
    #Using the name given to the Pokemon object, creates an API call via HTTP GET
    #to retrieve the Pokemon's type(s), base stats, and link to the Pokemon's sprite
    #to be displayed in battle and the Switch modal.
    def buildPokemon(self):
        #stats in order: 5 = HP, 4 = Atk, 3 = Def, 2 = SpAtk, 1 = SpDef, 0 = Speed
        requestString = "http://pokeapi.co/api/v2/pokemon/"
        requestString += str(self.name).lower()
        response = requests.get(requestString)
        data = response.json()
        
        #use API data to set types, 1 or 2 depending on the Pokemon
        types = data["types"]
        if(len(types) > 1):
            self.type2 = types[0]["type"]["name"]
            self.type1 = types[1]["type"]["name"]
        else:
            self.type1 = types[0]["type"]["name"]
        print self.name
        print self.type1
            
        #call the setStatValue function with API data to calculate
        #the Pokemon's stats based on the base stat of each
        self.stat[0].setStatValue(data["stats"][0]["base_stat"])
        self.stat[1].setStatValue(data["stats"][1]["base_stat"])
        self.stat[2].setStatValue(data["stats"][2]["base_stat"])
        self.stat[3].setStatValue(data["stats"][3]["base_stat"])
        self.stat[4].setStatValue(data["stats"][4]["base_stat"])
        self.stat[5].setHPValue(data["stats"][5]["base_stat"])
        self.maxHp = self.stat[5].statValue
        self.currentHp = self.maxHp
        
        #obtain the link to the Pokemon's sprite from within the API data
        self.spriteLink = data["sprites"]["front_default"]
        
    def getAttack(self):
        return self.stat[4].statValue
        
    def getDefense(self):
        return self.stat[3].statValue
        
    def getSpAtk(self):
        return self.stat[2].statValue
    
    def getSpDef(self):
        return self.stat[1].statValue
        
    def getSpeed(self):
        return self.stat[0].statValue
        
    def dealDamage(self, dmg):
        if dmg > self.currentHp:
            self.currentHp = 0
        else:
            self.currentHp = self.currentHp - dmg
            