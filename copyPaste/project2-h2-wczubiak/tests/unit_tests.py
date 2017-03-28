import unittest
import app

class appTest(unittest.TestCase):
    def test_not_command(self):
        response = app.chatbot('Potato', 0)
        self.assertEquals(response, '')
        
    def test_unrecognized(self):
        response = app.chatbot('!! potato', 0)
        self.assertEquals(response, "I know not that command.  Use '!! help' For a list of my commands!")

    def test_com_beauty(self):
        response = app.chatbot('!! beauty' , 0)
        self.assertEquals(response, 'When nine hundred years old you reach, look as good, you will not, hmmmm?')
    
    def test_com_try(self):
        response = app.chatbot('!! try' , 0)
        self.assertEquals(response, 'Do. Or do not. There is no try.')
        
    def test_com_about(self):
        response = app.chatbot('!! about' , 0)
        self.assertEquals(response, 'For jedi masters, this chatroom is!  Yes, hmmm.')
        
    def test_com_help(self):
        response = app.chatbot('!! help' , 0)
        self.assertEquals(response, "My commands, here are:  '!!  about', '!!  help;, '!!  say <something>', '!!  try', '!!  beauty', '!! yoda <write stuff here>'.  Yeesssssss." )
    
    def test_welcome_message(self):
        response = app.chatbot('Test User' , 1)
        self.assertEquals(response, 'Entered the room, Test User has. Yeesssssss.')
    
    def test_check_failed_url(self):
        response = app.checkForUrl('123.com')
        self.assertEquals(response, False)
    
    def test_check_pass_url(self):
        response = app.checkForUrl('https://www.google.com')
        self.assertEquals(response, True)
    
    def test_check_pass_image(self):
        response = app.checkForUrl('https://upload.wikimedia.org/wikipedia/en/6/6f/Yoda_Attack_of_the_Clones.png')
        self.assertEquals(response, True)

if __name__ == '__main__':
    unittest.main()