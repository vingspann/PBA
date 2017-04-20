from move import attack

class character():
    
    name = "Pikachu"
    Type1 = "Electric"
    Type2 = None
    move = []
    maxHp = 35
    currentHp = maxHp
    for i in range(4):
        move.append(attack())
        
    move[0].setName("Thunderbolt")
    move[1].setName("Tail Whip")
    move[2].setName("Iron Tail")
    move[3].setName("Play Nice")
    
    def nameSet(self, name):
        self.name = name
        
    def typeSet(self, type1):
        self.type1 = type1
    
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
    
    spriteLink = "https://cdn.iconverticons.com/files/png/1e2faeab4fac4558_128x128.png"
    
    
