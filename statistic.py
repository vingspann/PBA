
class statistic():
    
    def __init__(self):
        self.statName = ""
        self.statValue = 0
        self.statNumer = 2 #for modification in more advanced iterations
        self.statDenom = 2 #for modification in more advanced iterations
    
    #sets the name of the stat (HP, attack, defense, etc)
    def setName(self, name):
        self.statName = name
        
    #calculates the actual value of the stat based off of the base stat
    #provided by the API call in the buildPokemon() function of character.py
    def setStatValue(self, base):
        #base stat + IV * 2 * level / 100 + 5
        #used for all stats except HP
        self.statValue = ((((base + 31) * 2) * 50) / 100) + 5
        
    #as above, but specifically for the Hit Point statistic as its calculation
    #differs from that for other Pokemon statistics
    def setHPValue(self, base):
        #used solely for HP stat calculation
        #base stat + IV * 2 * level / 100 + level + 10
        self.statValue = ((((base + 31) * 2) * 50) / 100) + 50 + 10