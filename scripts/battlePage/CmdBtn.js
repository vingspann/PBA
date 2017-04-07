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
             'move1' : 'move1',
             'move2' : 'move2',
             'move3' : 'move3',
             'move4' : 'move4'
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);

    }
    
    
    handleSubmit(event) {
        event.preventDefault();

        console.log('A move was clicked.')

    }
    
    onClick1(){
        Socket.emit('battleLog', {'text' : 'Button 1 clicke'});
        console.log('Button 1 clicked.')
    }
    
    onClick2(){
        console.log('Button 2 clicked.')
        Socket.emit('battleLog', {'text' : 'Button 2 clicked.'});
    }
    
    onClick3(){
        console.log('Button 3 clicked.')
        Socket.emit('battleLog', {'text' : 'Button 3 clicked.'});
    }
    
    onClick4(){
        console.log('Button 4 clicked.')
        Socket.emit('battleLog', {'text' : 'Button 4 clicked.'});
    }

    componentDidMount(){
        
        Socket.emit('updateMoves')
        // Allows moves to be dynamically updated.
        Socket.on('updateMoves', (data) =>{
            this.setState({
                'move1' : data['move1'],
                'move2' : data['move2'],
                'move3' : data['move3'],
                'move4' : data['move4']
            })
        })
    }


    render() {
        var m1 = this.state.move1;
        var m2 = this.state.move2;
        var m3 = this.state.move3;
        var m4 = this.state.move4;
        
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup>
                            <InputGroup>
                                <ButtonToolbar>
                                    <Button id="move1" bsStyle="primary" onClick={this.onClick1}>{m1}</Button>
                                    <Button id="move2" bsStyle="primary" onClick={this.onClick2}>{m2}</Button>
                                    <Button id="move3" bsStyle="primary" onClick={this.onClick3}>{m3}</Button>
                                    <Button id="move4" bsStyle="primary" onClick={this.onClick4}>{m4}</Button>
                                </ButtonToolbar>
                            </InputGroup>
                        </FormGroup>
                    
                </form>
            </div>
        );
    }
}
