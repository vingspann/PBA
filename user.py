from character import character


class user():
    
    def __init__(self):
        self.name = ''
        self.pokemon = [character(), character()]
        self.hasWon = False
        self.currentPokemon = 0
        self.recentMove = 0
        self.ID = None
        self.lockSwitch = False
        self.pokemonLeft = 2
        self.lockMove = False
    #for i in range(2):
     #   pokemon.append(character())
        
    # This updates the number of the most recent move
    def updateRecent(self, move):
        self.recentMove = move
        
    # Sets the persons name for chat
    def nameSet(self, name):
        self.name = name
        
    def getCurrentPokemon(self):
        return self.currentPokemon
        
    def __repr__(self):
        return "Player" + str(self.pokemon)