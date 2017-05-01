import * as React from '../../node_modules/react';
import ReactDOM from '../../node_modules/react-dom'
import * as ReactBootstrap from '../../node_modules/react-bootstrap';
import { Socket } from './Socket';
import { Button } from '../../node_modules/react-bootstrap';
import { OverlayTrigger } from '../../node_modules/react-bootstrap';
import { Modal } from '../../node_modules/react-bootstrap';
import { Popover } from '../../node_modules/react-bootstrap';
import { Tooltip } from '../../node_modules/react-bootstrap';
import { ButtonToolbar } from '../../node_modules/react-bootstrap';


export class SurrenderBtn extends React.Component {
    constructor(props){
        super(props);
        this.state = {
             'showModal': false,
             'user' : 3
        };
        
        this.componentDidMount = this.componentDidMount.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.onClickCancelSurrender = this.onClickCancelSurrender.bind(this);
        this.onClickConfirmSurrender = this.onClickConfirmSurrender.bind(this);

    }
    
    onClickConfirmSurrender(){
        console.log('Surrender Confirmed.');
        Socket.emit('surrender');
         this.setState({ showModal: false });
    }
    
    onClickCancelSurrender(){
        console.log('Surrender Canceled')
        
        this.setState({ showModal: false });
    }

    close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }

    componentDidMount(){
        
        Socket.on('connection', (data) => {
            this.setState({
                'user' : data['user']
            });
            this.forceUpdate();
        });
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
        
        let sButton = null; 
        
        var user = this.state.user;
        if (user == 1 || user == 2){
            
            sButton = 
            <div id="surrender">
                <Button bsSize="large" onClick={this.open}>Surrender</Button>
                <Modal show={this.state.showModal} onHide={this.close} bsSize="small">
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Surrender...</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ButtonToolbar>
                            <Button id="SurrenderConfirm" bsSize="large" bsStyle="danger" onClick={this.onClickConfirmSurrender}>Confirm</Button>
                            <Button id="SurrenderCancel" bsSize="large" bsStyle="primary" onClick={this.onClickCancelSurrender}>Cancel</Button>
                        </ButtonToolbar>
                    </Modal.Body>
                </Modal>
            </div>;
            
        } else if (user == 3){
            sButton = '';
        };
        
        return (
            <div>
                {sButton}
            </div>
        );
    }
}