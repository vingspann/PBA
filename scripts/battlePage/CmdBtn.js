import * as React from '../../node_modules/react';
import * as ReactBootstrap from '../../node_modules/react-bootstrap';
import { Socket } from './Socket';
import { Button } from '../../node_modules/react-bootstrap';
import { InputGroup } from '../../node_modules/react-bootstrap';
import { FormControl } from '../../node_modules/react-bootstrap';
import { FormGroup } from '../../node_modules/react-bootstrap';
import { ButtonToolbar } from '../../node_modules/react-bootstrap';
import { ButtonGroup } from '../../node_modules/react-bootstrap';
import { Modal } from '../../node_modules/react-bootstrap';

export class CmdBtn extends React.Component {
    constructor(props){
        super(props);
        this.state = {
             'showModal': false,
             'name' : 'name',
             'move1' : 'move1',
             'move2' : 'move2',
             'move3' : 'move3',
             'move4' : 'move4',
             'user' : 3,
             'CM' : 0
        };
        this.onClick1 = this.onClick1.bind(this);
        this.onClick2 = this.onClick2.bind(this);
        this.onClick3 = this.onClick3.bind(this);
        this.onClick4 = this.onClick4.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.confirmMove = this.confirmMove.bind(this);
        this.joinGame = this.joinGame.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);

    }
    
    handleSubmit(event) {
        event.preventDefault();

        console.log('A move was clicked.');

    }
 
    onClick1(){
        Socket.emit('CM', {'CM' : 0});
        this.setState({'CM' : 0});
        console.log(this.state.CM);
        console.log('Button 1 clicked.');
    }
    
    onClick2(){
        console.log('Button 2 clicked.');
        this.setState({'CM' : 1});
        Socket.emit('CM', {'CM' : 1});
    }
    
    onClick3(){
        console.log('Button 3 clicked.');
        this.setState({'CM' : 2});
        Socket.emit('CM', {'CM' : 2});
    }
    
    onClick4(){
        console.log('Button 4 clicked.');
        this.setState({'CM' : 3});
        Socket.emit('CM', {'CM' : 3});
    }
    
    confirmMove() {
        console.log('Confirm move button clicked.');
        Socket.emit('confirmMove');
    }
    
    joinGame() {
        Socket.emit('joinGame');
        this.setState({ showModal: false });
    }
    
     close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }

    componentDidMount(){
        
        Socket.emit('updateInfo');
        // Allows moves to be dynamically updated.
        Socket.on('updatePokemon', (data) =>{
            this.setState({
                'name'  : data['name'],
                'move1' : data['move1'],
                'move2' : data['move2'],
                'move3' : data['move3'],
                'move4' : data['move4']
            });
        });
        
        Socket.on('connection', (data) => {
            this.setState({
                'user' : data['user']
            });
            this.forceUpdate();
        });
        {/*
        Socket.on('gameFull', (data) => {
          this.setState({ 'showModal': true}).bind(this);
        });
        */}
    }
    
    


    render() {
        var name = this.state.name;
        var m1 = this.state.move1;
        var m2 = this.state.move2;
        var m3 = this.state.move3;
        var m4 = this.state.move4;
        var CM = this.state.CM;
        var b1 = 'primary';
        var b2 = 'primary';
        var b3 = 'primary';
        var b4 = 'primary';
       
        if (CM == 0){
            b1 = 'success';
            b2 = 'primary';
            b3 = 'primary';
            b4 = 'primary';
        } else if (CM == 1){
            b1 = 'primary';
            b2 = 'success';
            b3 = 'primary';
            b4 = 'primary';
        } else if (CM == 2){
            b1 = 'primary';
            b2 = 'primary';
            b3 = 'success';
            b4 = 'primary';
        } else if (CM == 3){
            b1 = 'primary';
            b2 = 'primary';
            b3 = 'primary';
            b4 = 'success';
        }
        
        let moveArea = null;
        var user = this.state.user;
        if (user == 1 || user == 2){
            moveArea = 
            <form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <div id='nameLog'>
                    {name}
                    </div>
                    <InputGroup>
                        <ButtonToolbar>
                            <Button id='move1' bsStyle={b1} onClick={this.onClick1}>{m1}</Button>
                            <Button id='move2' bsStyle={b2} onClick={this.onClick2}>{m2}</Button>
                            <Button id='move3' bsStyle={b3} onClick={this.onClick3}>{m3}</Button>
                            <Button id='move4' bsStyle={b4} onClick={this.onClick4}>{m4}</Button>
                            <Button id='confirm' bsStyle='default' onClick={this.confirmMove}>Confirm Move</Button>
                        </ButtonToolbar>
                    </InputGroup>
                </FormGroup>
            </form>;
        } else if (user == 3){
                // Just add in html elements like the above. Don't forget a semi colon.
                
                moveArea =
                <div>
                <div id='nameLog'>
                    You are spectating
                </div>
                <div id='nameLog2'>
                    <Button  bsSize="large" onClick={this.joinGame}>Join Game</Button>
                </div>
                </div>;
        };
      
        
        return (
            <div>
                {moveArea}
                {/*
                <Modal show={this.state.showModal} bsSize="small" onHide={this.close} dialogClassName="custom-modal">
                    <Modal.Header closeButton>
                        <Modal.Title>Game Full</Modal.Title>
                    </Modal.Header>
                    
                    <Modal.Body>
                        Sorry. The game is currently full. Try again later!
                    </Modal.Body>
                    
                    <Modal.Footer>
                      <Button bsStyle = 'primary' onClick={this.close}>Ok</Button>
                    </Modal.Footer>
                </Modal>
                */}
            </div>
        );
    }
}
