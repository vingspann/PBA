import * as React from 'react';
import ReactDOM from 'react-dom'
import * as ReactBootstrap from 'react-bootstrap';
import { Socket } from './Socket';
import { Button } from 'react-bootstrap';
import { OverlayTrigger } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { Popover } from 'react-bootstrap';
import { Tooltip } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';


export class SurrenderBtn extends React.Component {
    constructor(props){
        super(props);
        this.state = {
             'showModal': false
        };
        
        this.componentDidMount = this.componentDidMount.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.onClickCancelSurrender = this.onClickCancelSurrender.bind(this);
        this.onClickConfirmSurrender = this.onClickConfirmSurrender.bind(this);

    }
    
    onClickConfirmSurrender(){
        console.log('Surrender Confirmed.');
        Socket.emit('battleLog', {'text' : 'Surrender confirmed.'});
         this.setState({ showModal: false });
    }
    
    onClickCancelSurrender(){
        console.log('Surrender Canceled')
        Socket.emit('battleLog', {'text' : 'Surrender canceled.'});
        this.setState({ showModal: false });
    }

    close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }

    componentDidMount(){
        
    }


    render() {
        const popover = (
            <Popover id="modal-popover" title="popover">
            very popover. such engagement
            </Popover>
        );
        const tooltip = (
            <Tooltip id="modal-tooltip">
                wow.
            </Tooltip>
        );
        
        return (
            <div id="surrender">
            
                <Button bsSize="large" onClick={this.open}>Surrender</Button>

                <Modal show={this.state.showModal} onHide={this.close} bsSize="small">
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Surrender...</Modal.Title>
                    </Modal.Header>
                    
                    <Modal.Body>
                        <ButtonToolbar>
                            <Button id="SurrenderConfirm" bsSize="large" bsStyle="primary" onClick={this.onClickConfirmSurrender}>Confirm</Button>
                            <Button id="SurrenderCancel" bsSize="large" bsStyle="primary" onClick={this.onClickCancelSurrender}>Cancel</Button>
                        </ButtonToolbar>
                    </Modal.Body>
                    
                </Modal>
            </div>
        );
    }
}