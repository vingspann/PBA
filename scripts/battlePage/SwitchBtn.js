import * as React from 'react';
import ReactDOM from 'react-dom'
import * as ReactBootstrap from 'react-bootstrap';
import { Socket } from './Socket';
import { Button } from 'react-bootstrap';
import { OverlayTrigger } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { Popover } from 'react-bootstrap';
import { Tooltip } from 'react-bootstrap';
import { ProgressBar } from 'react-bootstrap';

export class SwitchBtn extends React.Component {
    constructor(props){
        super(props);
        this.state = {
             'showModal': false,
             'firstPokeball': "box",
             'secondPokeball': "box box2",
             'health0' : 'health0',
             'link0' : 'link0',
             'health1' : 'health1',
             'link1' : 'link1',
             'currentPokemon' : 1,
             'user' : 3
        };
        
        this.componentDidMount = this.componentDidMount.bind(this);
        this.onClickSwitchOne = this.onClickSwitchOne.bind(this);
        this.onClickSwitchTwo = this.onClickSwitchTwo.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);

    }

    onClickSwitchOne(){

        
        if (this.state.currentPokemon == 1){
            console.log("Already active pokemon")
        }else {    
            Socket.emit('CM', {
                'CM' : 5,
                'currentPokemon' : 1
                
            });
            this.setState({'currentPokemon' : 1});
            console.log('Pokemon 1 selected.');
            this.setState({ showModal: false });
        }
        

       
    }
    
     onClickSwitchTwo(){

        
        if (this.state.currentPokemon == 2){
            console.log("Already currentPokemon")
        } else {
           
            Socket.emit('CM', {
                'CM' : 5,
                'currentPokemon' : 2
                
            });
            this.setState({'currentPokemon' : 2});
            console.log('Pokemon 2 selected.');
            this.setState({ showModal: false });
        }
        

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
        Socket.emit('updateInfo')
        // Allows moves to be dynamically updated.
        Socket.on('getBothPokemon', (data) =>{
            this.setState({
                'health0': data['health0'],
                'link0'  : data['link0'],
                'health1': data['health1'],
                'link1'  : data['link1'],
            })
        })
    }


    render() {
        let link0 = this.state.link0;
        var health0 = this.state.health0;
        let link1 = this.state.link1;
        var health1 = this.state.health1;
        
        health0 = parseFloat(health0).toFixed(2);
        health1 = parseFloat(health1).toFixed(2);
        console.log(link0)
        const popover = (
            <Popover id="modal-popover" title="popover">
            very popover. such engagement
            </Popover>
        );
        const tooltip0 = (
            <Tooltip id="modal-tooltip" >
                <img src={link0} alt="Pokemon1" />
                <ProgressBar>
                        <ProgressBar bsStyle="success" now={health0*100} label={`${Math.floor(health0*100)}%`} key={1} />
                        <ProgressBar bsStyle="danger" now={100 - (health0*100)} key={2} />
                </ProgressBar>
            </Tooltip>
        );
        const tooltip1 = (
            <Tooltip id="modal-tooltip" >
                <img src={link1} alt="Pokemon1" />
                <ProgressBar>
                        <ProgressBar bsStyle="success" now={health1*100} label={`${Math.floor(health1*100)}%`} key={1} />
                        <ProgressBar bsStyle="danger" now={100 - (health1*100)} key={2} />
                </ProgressBar>
            </Tooltip>
        );
        let switchButton = null;
        var user = this.state.user;
        if (user == 1 || user == 2){
            switchButton = 
            <div id="switch">
            
                <Button bsSize="large" onClick={this.open}>Switch</Button>

                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Switch Pokemon</Modal.Title>
                    </Modal.Header>
                    
                    <Modal.Body>
                    <div>
                        <OverlayTrigger overlay={tooltip0} placement="left"><div className={this.state.firstPokeball} onClick={this.onClickSwitchOne}></div></OverlayTrigger>
                        <OverlayTrigger overlay={tooltip1} placement="right"><div className={this.state.secondPokeball} onClick={this.onClickSwitchTwo}></div></OverlayTrigger>
                    </div>
                    </Modal.Body>
                    
                    <Modal.Footer>
                        <Button onClick={this.close}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </div>;    
        } else if (user == 3){
            switchButton = '';
        };
        return (
            <div>
                {switchButton}
            </div>
        );
    }
}