
class attack():
    def __init__(self):
        self.name = ''
        self.PP = 0
        self.currentPP = 0
        self.moveType = ''
        self.accuracy = 0
        self.status = ''
        self.statusChance = 0
    
    def setInfo(self, name, PP, currentPP, moveType, accuracy, status, statusChance):
        self.name = name
        self.PP = PP
        self.currentPP = currentPP
        self.moveType = moveType
        self.accuracy = accuracy
        self.status = status
        self.statusChance = statusChance
        
    #this is just for testing purposes
    def setName(self, name):
        self.name = name
    