import * as React from '../../node_modules/react';
import ReactDOM from '../../node_modules/react-dom'
import * as ReactBootstrap from '../../node_modules/react-bootstrap';
import { Socket } from './Socket';
import { Button } from '../../node_modules/react-bootstrap';
import { InputGroup } from '../../node_modules/react-bootstrap';
import { FormGroup } from '../../node_modules/react-bootstrap';
import { ButtonToolbar } from '../../node_modules/react-bootstrap';
import { SwitchBtn } from './SwitchBtn';
import { SurrenderBtn } from './SurrenderBtn';
import { ButtonGroup } from '../../node_modules/react-bootstrap';

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

        console.log('An action was clicked.');

    }
    
    onClickSwitch(){
        Socket.emit('battleLog', {'text' : 'Switch button clicked'});
        Socket.emit('secondaryChar', {});
        Socket.emit('switch');
        console.log('Button 1 clicked.');
       
    }
    
    onClickSurrender(){
        console.log('Button 2 clicked.');
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
                                    <ButtonGroup>
                                        <SwitchBtn/>
                                    </ButtonGroup>
                                    <ButtonGroup>
                                        <SurrenderBtn/>
                                    </ButtonGroup>
                                </ButtonToolbar>
                            </InputGroup>
                        </FormGroup>
                    
                </form>
            </div>
        );
    }
}
