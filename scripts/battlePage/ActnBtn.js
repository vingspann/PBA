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
        const modalInstance = (
            <div className="static-modal">
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>Switch Pokemon</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        Temp pokemon switch message.
                    </Modal.Body>

                    <Modal.Footer>
                        <Button>Cancel</Button>
                        <Button bsStyle="primary">Switch</Button>
                    </Modal.Footer>

                    </Modal.Dialog>
            </div>
        );

        ReactDOM.render(modalInstance, mountNode);

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
