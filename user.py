from character import character


class user():
    
    def __init__(self):
        self.name = ''
        self.pokemon = [character(), character(), character(), character()]
        self.hasWon = False
        self.currentPokemon = 0
        self.recentMove = 0
        self.ID = None
        self.pokemonLeft = 4
        self.lockMove = False
        self.switchPokemon = 0
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
        
    def reset(self):
        self.name = ''
        self.pokemon[0].currentHp = self.pokemon[0].maxHp
        self.pokemon[1].currentHp = self.pokemon[1].maxHp
        self.pokemon[2].currentHp = self.pokemon[2].maxHp
        self.pokemon[3].currentHp = self.pokemon[3].maxHp

        self.hasWon = False
        self.currentPokemon = 0
        self.recentMove = 0
        self.ID = None
        self.pokemonLeft = 4
        self.lockMove = False
        self.switchPokemon = 0