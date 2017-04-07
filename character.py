class pokemon():
    
    name = "Pikachu"
    Type1 = "Electric"
    Type2 = None
    move1 = "Thunderbolt"
    move2 = "Tail Whip"
    move3 = "Thunder Shock"
    move4 = "Play Nice"
    
    def hp(self, numerator, denominator):
          self.numerator = numerator
          self.denominator = denominator
          
    def move(self, move1,move2,move3,move4):
          self.move1 = move1
          self.move2 = move2
          self.move3 = move3
          self.move4 = move4
    
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