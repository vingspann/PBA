from character import pokemon


class user():
    
    name = ''
    monster = []
    hasWon = False
    currentMonster = 1
    recentMove = 1
    for i in range(2):
        monster.append(pokemon())
        
    # This updates the number of the most recent move
    def updateRecent(self, move):
        recentMove = move
        
    # This updates the number of the current pokemon
    def updateCurrent(self, poke):
        currentMonster = poke
        
    # Sets the persons name for chat
    def nameSet(self, name):
        self.name = name;
        
    