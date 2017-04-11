
class attack():
    name = ''
    PP = 0
    currentPP = 0
    moveType = ''
    accuracy = 0
    status = ''
    statusChance = 0
    
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
    