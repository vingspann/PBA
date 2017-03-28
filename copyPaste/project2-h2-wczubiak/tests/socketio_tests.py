import app, unittest

class SocketIOTestCase(unittest.TestCase):
    def test_server_on_connect(self):
        client = app.socketio.test_client(app.app)
        r = client.get_received()
        #print r
        self.assertEquals(len(r), 3)
        from_server = r[2]
        #print from_server
        self.assertEquals(from_server['name'], 'connected')
        data = from_server['args'][0]
        self.assertEquals(data['message'], 'someone connected')
        
        
        
    def test_server_disconnect(self):
        client = app.socketio.test_client(app.app)
        client.emit("disconnect")
        r = client.get_received()
        #print r
        self.assertEquals(len(r), 5)
        from_server = r[3]
        #print from_server
        self.assertEquals(from_server['name'], 'disconnected')
        data = from_server['args'][0]
        self.assertEquals(data['message'], 'someone disconnected')
        
        
    

if __name__ == '__main__':
    unittest.main()