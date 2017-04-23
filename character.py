from move import attack
from stat import stat

class character():
    
    def __init__(self):
        self.name = "Pikachu"
        self.type1 = "electric"
        self.type2 = None
        self.move = []
        self.stats = []
        self.maxHp = 100
        self.attack = 1
        self.defense = 1
        self.spAtk = 1
        self.spDef = 1
        self.speed = 1
        self.currentHp = self.maxHp
        for i in range(4):
            self.move.append(attack())
        for i in range(7):
            self.stats.append(stat())
        
        self.move[0].setName("Thunderbolt")
        self.move[1].setName("Tail Whip")
        self.move[2].setName("Iron Tail")
        self.move[3].setName("Play Nice")
        self.stat[0].setName("Speed")
        self.stat[1].setName("Special Defense")
        self.stat[2].setName("Special Attack")
        self.stat[3]
        
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
        #restful api connection info here
        if self.name == "Pikachu":
            self.type1 = "electric"
            self.type2 = None
            #call 25
        elif self.name == "Dragonite":
            self.type1 = "dragon"
            self.type2 = "flying"
            #call 149
        elif self.name == "Scyther":
            self.type1 = "bug"
            self.type2 = "flying"
            #call 123
        elif self.name == "Charizard":
            self.type1 = "fire"
            self.type2 = "flying"
            #call 6
    
    attack = 85
    sAttack = 90
    attackMod = 91
    sAttackMod = 92

    defense = 70
    sDefense = 75
    defenseMod = 80
    sDefenseMod = 82

    speed = 80
    speedMod = 82

    evasion = 90
    evasionMod = 92

    accuracy = 80
    accuracyMod = 85
    
        
    
    
    def sprite(self, spriteLink):
        self.spriteLink = spriteLink
        

    
    
