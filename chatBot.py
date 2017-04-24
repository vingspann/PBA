class bot():
    name = "Professor Oak"
    img = "link"

    def checkText(self, message):
        msg = message.split()
        
        if msg[0] == "!!":
            if (msg[1] == "help"):
                return "Please consult your pokedex"
            elif (msg[1] == "bike"):
                return "There's a time and place for everything, but not now."
            elif (msg[1] == "gender"):
                return "Your gender is your own, I won't ask if you're a boy or a girl!"
            elif (msg[1] == "type"):
                return "1337"
        return ''
    
    def check(self, message):
        
        response = self.checkText(message)
        
        if len(response) > 1:
            return True, response
        return False, response
        