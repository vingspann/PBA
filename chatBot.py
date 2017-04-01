class bot():
    name = "Professor Oak"
    img = "link"

    def checkText(self, message):
        msg = message.split()
        
        if msg[0] == "!!":
            if (msg[1] == "help"):
                return "Please consult your pokedex"
            if (msg[1] == "bike"):
                return "There's a time and place for everything, but not now."
        return ''
    
    def check(self, message):
        
        response = self.checkText(message)
        
        if len(response) > 1:
            return True, response
        return False, response
        