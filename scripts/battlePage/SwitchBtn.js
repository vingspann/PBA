import * as React from 'react';
import ReactDOM from 'react-dom'
import * as ReactBootstrap from 'react-bootstrap';
import { Socket } from './Socket';
import { Button } from 'react-bootstrap';
import { OverlayTrigger } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { Popover } from 'react-bootstrap';
import { Tooltip } from 'react-bootstrap';


export class SwitchBtn extends React.Component {
    constructor(props){
        super(props);
        this.state = {
             'showModal': false
        };
        
        this.componentDidMount = this.componentDidMount.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);

    }

    onClickSwitch(){
        Socket.emit('battleLog', {'text' : 'Switch button clicked'});
        Socket.emit('secondaryChar', {});
        Socket.emit('switch');
        console.log('Button 1 clicked.');
       
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
            <Tooltip id="modal-tooltip" >
                <img img src="../static/img/PBALogo.png" alt="PBA logo"/>
            </Tooltip>
        );
        
        return (
            <div id="switch">
            
                <Button bsSize="large" onClick={this.open}>Switch</Button>

                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Switch Pokemon</Modal.Title>
                    </Modal.Header>
                    
                    <Modal.Body>
                    <div align = "center">
                        <OverlayTrigger overlay={tooltip} placement="top"><div className="box"></div></OverlayTrigger>
                        
                        <div className="box box1"></div>
                        <div className="box box2"></div>
                        <div className="box box3"></div>
                        <div className="box box4"></div>
                        <div className="box box5"></div>
                        <div className="box box6"></div>
                        <div className="box box7"></div>
                        <div className="box box8"></div>
                    </div>
                    </Modal.Body>
                    
                    <Modal.Footer>
                        <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}