import * as React from 'react';
import ReactDOM from 'react-dom'
import * as ReactBootstrap from 'react-bootstrap';
import { Socket } from './Socket';
import { Button } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import { SwitchBtn } from './SwitchBtn';

export class ActnBtn extends React.Component {
    constructor(props){
        super(props);
        this.state = {
             
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
        Socket.emit('secondaryChar', {});
        Socket.emit('switch');
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
