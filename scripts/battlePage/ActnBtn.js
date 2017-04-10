import * as React from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import { Socket } from './Socket';
import { Button } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';

export class ActnBtn extends React.Component {
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

        console.log('An action was clicked.')

    }
    
    onClickSwitch(){
        Socket.emit('battleLog', {'text' : 'Switch button clicked'});
        console.log('Button 1 clicked.')
    }
    
    onClickSurrender(){
        console.log('Button 2 clicked.')
        Socket.emit('battleLog', {'text' : 'Surrender button clicked.'});
    }

    componentDidMount(){
        
    }


    render() {
        
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup>
                            <InputGroup>
                                <ButtonToolbar>
                                    <Button id="Switch" bsSize="large" onClick={this.onClickSwitch}>Switch</Button>
                                    <Button id="Surrender" bsSize="large" onClick={this.onClickSurrender}>Surrender</Button>
                                </ButtonToolbar>
                            </InputGroup>
                        </FormGroup>
                    
                </form>
            </div>
        );
    }
}
