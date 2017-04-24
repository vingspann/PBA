from statistic import statistic
from move import attack

import requests

class character():
    
    def __init__(self):
        self.name = "Pikachu"
        self.type1 = "electric"
        self.type2 = None
        self.move = []
        self.stat = []
        self.maxHp = 100
        self.currentHp = self.maxHp
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
        
        self.spriteLink = "https://cdn.iconverticons.com/files/png/1e2faeab4fac4558_128x128.png"
    
    def nameSet(self, name):
        self.name = name
        
    def typeSet(self, type1):
        self.type1 = type1
        
    def typeSet2(self, type2):
        self.type2 = type2
    
    def hp(self, numerator, denominator):
          self.numerator = numerator
          self.denominator = denominator
          
    def moves(self, move1,move2,move3,move4):
          self.move[0].setName(move1)
          self.move[1].setName(move2)
          self.move[2].setName(move3)
          self.move[3].setName(move4)
          
    # change this to the actual formula for the percentage of the health
    def percentHealth(self):
        return 0.5
    def healthSet(self, maxHp):
        self.maxHp = maxHp
        
    def statSet(self):
        #stats in order: 5 = HP, 4 = Atk, 3 = Def, 2 = SpAtk, 1 = SpDef, 0 = Speed
        if self.name == "Pikachu":
            response = requests.get("http://pokeapi.co/api/v2/pokemon/25")
            data = response.json()
            self.type1 = "electric"
            self.type2 = None
            self.stat[0].setStatValue(data["stats"][0]["base_stat"])
            print self.stat[0].statValue
            self.stat[1].setStatValue(data["stats"][1]["base_stat"])
            print self.stat[1].statValue
            self.stat[2].setStatValue(data["stats"][2]["base_stat"])
            print self.stat[2].statValue
            self.stat[3].setStatValue(data["stats"][3]["base_stat"])
            print self.stat[3].statValue
            self.stat[4].setStatValue(data["stats"][4]["base_stat"])
            print self.stat[4].statValue
            self.stat[5].setHPValue(data["stats"][5]["base_stat"])
            print self.stat[5].statValue
            #call 25
        elif self.name == "Dragonite":
            response = requests.get("http://pokeapi.co/api/v2/pokemon/149")
            data = response.json()
            self.stat[0].setStatValue(data["stats"][0]["base_stat"])
            print self.stat[0].statValue
            self.stat[1].setStatValue(data["stats"][1]["base_stat"])
            print self.stat[1].statValue
            self.stat[2].setStatValue(data["stats"][2]["base_stat"])
            print self.stat[2].statValue
            self.stat[3].setStatValue(data["stats"][3]["base_stat"])
            print self.stat[3].statValue
            self.stat[4].setStatValue(data["stats"][4]["base_stat"])
            print self.stat[4].statValue
            self.stat[5].setHPValue(data["stats"][5]["base_stat"])
            print self.stat[5].statValue
            self.type1 = "dragon"
            self.type2 = "flying"
            #call 149
        elif self.name == "Scyther":
            response = requests.get("http://pokeapi.co/api/v2/pokemon/123")
            data = response.json()
            self.stat[0].setStatValue(data["stats"][0]["base_stat"])
            print self.stat[0].statValue
            self.stat[1].setStatValue(data["stats"][1]["base_stat"])
            print self.stat[1].statValue
            self.stat[2].setStatValue(data["stats"][2]["base_stat"])
            print self.stat[2].statValue
            self.stat[3].setStatValue(data["stats"][3]["base_stat"])
            print self.stat[3].statValue
            self.stat[4].setStatValue(data["stats"][4]["base_stat"])
            print self.stat[4].statValue
            self.stat[5].setHPValue(data["stats"][5]["base_stat"])
            print self.stat[5].statValue
            self.type1 = "bug"
            self.type2 = "flying"
            #call 123
        elif self.name == "Charizard":
            response = requests.get("http://pokeapi.co/api/v2/pokemon/6")
            data = response.json()
            self.stat[0].setStatValue(data["stats"][0]["base_stat"])
            print self.stat[0].statValue
            self.stat[1].setStatValue(data["stats"][1]["base_stat"])
            print self.stat[1].statValue
            self.stat[2].setStatValue(data["stats"][2]["base_stat"])
            print self.stat[2].statValue
            self.stat[3].setStatValue(data["stats"][3]["base_stat"])
            print self.stat[3].statValue
            self.stat[4].setStatValue(data["stats"][4]["base_stat"])
            print self.stat[4].statValue
            self.stat[5].setHPValue(data["stats"][5]["base_stat"])
            print self.stat[5].statValue
            self.type1 = "fire"
            self.type2 = "flying"
            #call 6
    
    def sprite(self, spriteLink):
        self.spriteLink = spriteLink
        

    
    
