import app, unittest, flask_testing, requests

class ServerIntegrationTestCase(flask_testing.LiveServerTestCase):
    
    def create_app(self):
        return app.app
    
    def test_server_connection(self):
        r = requests.get(self.get_server_url())
        self.assertEqual(str(r), '<Response [200]>')
        
    
    
if __name__ == '__main__':
    unittest.main()