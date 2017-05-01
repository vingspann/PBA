import requests

class pokeType:
    def __init__(self):
        self.name = ''
        self.superEffective = []
        self.notVeryEffective = []
        self.noDamage = []
        
    def buildType(self):
        #build a request string to find super/not very effective types
        #and no damage types based on the move's typing
        requestString = "http://pokeapi.co/api/v2/type/"
        searchType = self.name
        requestString += str(searchType).lower()
        response = requests.get(requestString)
        data = response.json()
        
        #use the API data to add to the superEffective, notVeryEffective,
        #and noDamage arrays for the move
        for pokeType in data["damage_relations"]["double_damage_to"]:
            self.superEffective.append(pokeType["name"])
        
        for pokeType in data["damage_relations"]["half_damage_to"]:
            self.notVeryEffective.append(pokeType["name"])
            
        for pokeType in data["damage_relations"]["no_damage_to"]:
            self.noDamage.append(pokeType["name"])