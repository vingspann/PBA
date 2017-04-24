import * as React from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import { Socket } from './Socket';
import { Button } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';

export class CmdBtn extends React.Component {
    constructor(props){
        super(props);
        this.state = {
             'name' : 'name',
             'move1' : 'move1',
             'move2' : 'move2',
             'move3' : 'move3',
             'move4' : 'move4',
             'user' : 3
        };
        this.onClick1 = this.onClick1.bind(this);
        this.onClick2 = this.onClick2.bind(this);
        this.onClick3 = this.onClick3.bind(this);
        this.onClick4 = this.onClick4.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);

    }
    
    handleSubmit(event) {
        event.preventDefault();

        console.log('A move was clicked.')

    }
 
    onClick1(){
        Socket.emit('battleLog', {'text' : this.state.move1});
        console.log('Button 1 clicked.')
    }
    
    onClick2(){
        console.log('Button 2 clicked.')
        Socket.emit('battleLog', {'text' : this.state.move2});
    }
    
    onClick3(){
        console.log('Button 3 clicked.')
        Socket.emit('battleLog', {'text' : this.state.move3});
    }
    
    onClick4(){
        console.log('Button 4 clicked.')
        Socket.emit('battleLog', {'text' : this.state.move4});
    }

    componentDidMount(){
        
        Socket.emit('updateInfo')
        // Allows moves to be dynamically updated.
        Socket.on('updatePokemon', (data) =>{
            this.setState({
                'name'  : data['name'],
                'move1' : data['move1'],
                'move2' : data['move2'],
                'move3' : data['move3'],
                'move4' : data['move4']
            })
        });
        
        Socket.on('connection', (data) => {
            this.setState({
                'user' : data['user']
            })
        });
    }


    render() {
        var name = this.state.name;
        var m1 = this.state.move1;
        var m2 = this.state.move2;
        var m3 = this.state.move3;
        var m4 = this.state.move4;
        
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
                            <Button id='move1' bsStyle='primary' onClick={this.onClick1}>{m1}</Button>
                            <Button id='move2' bsStyle='primary' onClick={this.onClick2}>{m2}</Button>
                            <Button id='move3' bsStyle='primary' onClick={this.onClick3}>{m3}</Button>
                            <Button id='move4' bsStyle='primary' onClick={this.onClick4}>{m4}</Button>
                        </ButtonToolbar>
                    </InputGroup>
                </FormGroup>
            </form>;
        } else if (user == 3){
                // Just add in html elements like the above. Don't forget a semi colon.
                moveArea = 'You are spectating';
        };
      
        
        return (
            <div>
                {moveArea}
            </div>
        );
    }
}
