import * as React from '../../node_modules/react';
import { ChatLog } from './ChatLog';
import { CmdBtn } from './CmdBtn';
import { BattleLog } from './BattleLog';
import { YoPokemon } from './YoPokemon';
import { ActnBtn } from './ActnBtn';
import { Navbar } from '../../node_modules/react-bootstrap';
import { NavItem } from '../../node_modules/react-bootstrap';
import { Nav } from '../../node_modules/react-bootstrap';
import { Modal } from '../../node_modules/react-bootstrap';
import { Carousel } from '../../node_modules/react-bootstrap';
import { FBLogin } from './FBLogin';
import { Button } from '../../node_modules/react-bootstrap';


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
                                <div id='status'></div>
                            </NavItem>
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
                    <div>
                        <Carousel>
                            <Carousel.Item>
                                <img width={900} height={500} className="carouselImg" alt="900x500" src="../static/img/Pokémon_Stadium_2.jpg"/>
                                <Carousel.Caption>
                                    <h3>Welcome to PBA Stadium!!</h3>
                                    <p>We built this site to simulate small, simple pokemon battles.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img width={900} height={500} className="carouselImg" alt="900x500" src="../static/img/pokemonStadium.jpg"/>
                                <Carousel.Caption>
                                    <h3>Battle Log</h3>
                                    <p>The Battle Log is the black window in the center of your screen.  All moves and results will be displayed here.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img width={900} height={500} className="carouselImg" alt="900x500" src="../static/img/Pokémon_Stadium_2.jpg"/>
                                <Carousel.Caption>
                                    <h3>Pokemon Info</h3>
                                    <p>To the left of the Battle Log is the Pokemon Info window.  This window shows your currently selected pokemon and the opponents currently selected pokemon.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img width={900} height={500} className="carouselImg" alt="900x500" src="../static/img/Pokémon_Stadium_2.jpg"/>
                                <Carousel.Caption>
                                    <h3>Pokemon Commands</h3>
                                    <p>Once you have joined a battle you will see a few buttons below the Battle Log where you can select the move you want your pokemon to use.  By double clicking the button, the move will be set and clicking Confirm Move will let the system know you are ready to continue.  You can also switch out the pokemon you are using or surrender the battle if you feel so inclined.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img width={900} height={500} className="carouselImg" alt="900x500" src="../static/img/Pokémon_Stadium_2.jpg"/>
                                <Carousel.Caption>
                                    <h3>Chat</h3>
                                    <p>To the right of the Battle Log is our chat window.  Feel free to converse about Pokemon or talk trash.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>
                    </div>
                    </Modal.Body>
                    
                    <Modal.Footer>
                       <Navbar>
                            <Navbar.Header>
                                <Navbar.Toggle />
                            </Navbar.Header>
                            <Navbar.Collapse>
                                <Nav>
                                    <Button bsSize="large" bsStyle="primary" onClick={this.close}>Spectate</Button>
                                </Nav>
                                <Nav pullRight>
                                    <Button bsSize="large" bsStyle="primary" onClick={this.close}>Join Game</Button>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                    </Modal.Footer>
                </Modal>
                
                
                
            </div>
           
        );
    }
    
}