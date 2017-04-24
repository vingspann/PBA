import * as React from 'react';
import { ChatLog } from './ChatLog';
import { CmdBtn } from './CmdBtn';
import { BattleLog } from './BattleLog';
import { YoPokemon } from './YoPokemon';
import { ActnBtn } from './ActnBtn';
import { Navbar } from 'react-bootstrap';
import { NavItem } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { Carousel } from 'react-bootstrap';
import { FBLogin } from './FBLogin';
import { Button } from 'react-bootstrap';


export class Content extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            'showModal': true
        };
        
        this.componentDidMount = this.componentDidMount.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    };

    componentDidMount(){
      

    }
    
     close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }
    
    
    render(){
        
        return (
            <div>
                <div id="navBar">
                <Navbar id="innerNavBar">
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#" onClick={this.open}>About</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavItem eventKey={1} href="https://pokeapi.co">API</NavItem>
                        </Nav>
                         <Nav>
                            <NavItem eventKey={1} href="https://github.com/vingspann/PBA">GitHub</NavItem>
                        </Nav>
                        
                        <Nav pullRight>
                            <NavItem eventKey={2} href="#">
                                <FBLogin/>
                            </NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                </div>
                <div id="info">


                    <div id="pokeInfo"><YoPokemon/></div>
                    <div id="battleLog"><BattleLog/></div>
                    <div id="chat"><ChatLog/></div>
                </div>
                <div id="cmdButton"><CmdBtn/></div>
                <div id="gameAction"><ActnBtn/></div>
                
                <Modal show={this.state.showModal} onHide={this.close} dialogClassName="custom-modal">
                    <Modal.Header closeButton>
                        <Modal.Title>About</Modal.Title>
                    </Modal.Header>
                    
                    <Modal.Body>
                    <div class="row">
                        <Carousel>
                            <Carousel.Item>
                                <img width={900} height={500} alt="900x500" src="../static/img/Pokémon_Stadium_2.jpg"/>
                                <Carousel.Caption>
                                    <h3>First slide label</h3>
                                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img width={900} height={500} alt="900x500" src="../static/img/pokemonStadium.jpg"/>
                                <Carousel.Caption>
                                    <h3>Second slide label</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img width={900} height={500} alt="900x500" src="../static/img/PBALogo.png"/>
                                <Carousel.Caption>
                                    <h3>Third slide label</h3>
                                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>
                    </div>
                    </Modal.Body>
                    
                    <Modal.Footer>
                        <Button onClick={this.close}>Continue</Button>
                    </Modal.Footer>
                </Modal>
                
                
                
            </div>
           
        );
    }
    
}