from character import character


class user():
    
    name = ''
    pokemon = []
    hasWon = False
    currentPokemon = 0
    recentMove = 1
    ID = None
    for i in range(2):
        pokemon.append(character())
        
    # This updates the number of the most recent move
    def updateRecent(self, move):
        recentMove = move
        
    # This updates the number of the current pokemon
    def updateCurrent(self, poke):
        currentMonster = poke
        
    # Sets the persons name for chat
    def nameSet(self, name):
        self.name = name;
        
    