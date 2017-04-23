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
             'showModal': false,
             'firstPokeball': "box",
             'secondPokeball': "box box2",
<<<<<<< HEAD
             'currentPokemon' : 1
=======
             'user' : 3
>>>>>>> master
        };
        
        this.componentDidMount = this.componentDidMount.bind(this);
        this.onClickSwitchOne = this.onClickSwitchOne.bind(this);
        this.onClickSwitchTwo = this.onClickSwitchTwo.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.getRandomInt = this.getRandomInt.bind(this);
        this.randomPokeball = this.randomPokeball.bind(this);

    }

    onClickSwitchOne(){
        
        if (this.state.currentPokemon == 1){
            console.log("Already active pokemon")
        }else {    
            Socket.emit('switch', {'currentPokemon' : 1});
            this.setState({'currentPokemon' : 1});
            Socket.emit('battleLog', {'text' : 'Pokemon 1 selected for switch.'});
            Socket.emit('secondaryChar', {});
            console.log('Pokemon 1 selected.');
            this.setState({ showModal: false });
        }
        
       
    }
    
     onClickSwitchTwo(){
        
        if (this.state.currentPokemon == 2){
            console.log("Already currentPokemon")
        } else {
            Socket.emit('battleLog', {'text' : 'Pokemon 2 selected for switch.'});
            Socket.emit('secondaryChar', {});
            Socket.emit('switch', {'currentPokemon' : 2});
            this.setState({'currentPokemon' : 2});
            console.log('Pokemon 2 selected.');
            this.setState({ showModal: false });
        }
        
    }
    
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    randomPokeball(){
        var ballOne = this.getRandomInt(1,4);
        var ballTwo = this.getRandomInt(1,4);
        
        if(ballOne == 1)
        {
            this.setState({firstPokeball: "box"});
        }
        else if(ballOne == 2)
        {
            this.setState({firstPokeball: "box box2"});
        }
        else if(ballOne == 3)
        {
            this.setState({firstPokeball: "box box3"});
        }
        else if(ballOne == 4)
        {
            this.setState({firstPokeball: "box box4"});
        }
        
        if(ballTwo == 1)
        {
            this.setState({secondPokeball: "box"});
        }
        else if(ballTwo == 2)
        {
            this.setState({firstPokeball: "box box2"});
        }
        else if(ballTwo == 3)
        {
            this.setState({secondPokeball: "box box3"});
        }
        else if(ballTwo == 4)
        {
            this.setState({secondPokeball: "box box4"});
        }
        
        this.setState({ showModal: true });
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
            })
        });
    }


    render() {
        const popover = (
            <Popover id="modal-popover" title="popover">
            very popover. such engagement
            </Popover>
        );
        const tooltip = (
            <Tooltip id="modal-tooltip" >
                <img src="../static/img/PBALogo.png" alt="PBA logo" />
            </Tooltip>
        );
        let switchButton = null;
        var user = this.state.user;
        if (user == 1 || user == 2){
            switchButton = 
            <div id="switch">
            
                <Button bsSize="large" onClick={this.randomPokeball}>Switch</Button>

                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Switch Pokemon</Modal.Title>
                    </Modal.Header>
                    
                    <Modal.Body>
                    <div>
                        <OverlayTrigger overlay={tooltip} placement="top"><div className={this.state.firstPokeball} onClick={this.onClickSwitchOne}></div></OverlayTrigger>
                        <OverlayTrigger overlay={tooltip} placement="top"><div className={this.state.secondPokeball} onClick={this.onClickSwitchTwo}></div></OverlayTrigger>
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