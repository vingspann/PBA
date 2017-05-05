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
import { Socket } from './Socket';


export class Content extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            'showModal': true,
            'showGameFullModal': false
        };
        
        this.componentDidMount = this.componentDidMount.bind(this);
        this.joinGame = this.joinGame.bind(this);
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
    
    joinGame() {
        Socket.emit('joinGame');
        this.setState({ showModal: false });
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
                        <Modal.Title>About...</Modal.Title>
                    </Modal.Header>
                    
                    <Modal.Body>
                    <div>
                        <Carousel>
                            <Carousel.Item>
                                <img width={900} height={500} className="carouselImg" alt="900x500" src="../static/img/slide1.jpg"/>
                                <Carousel.Caption>
                                    <h3>Welcome to PBA Stadium!!</h3>
                                    <p>The Pokemon Battling Application (PBA) is designed to be a social application utilizing Facebook login to enable two users to do a battle with preset (for now) teams of Pokemon!</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img width={900} height={500} className="carouselImg" alt="900x500" src="../static/img/PBAbattleLog.jpg"/>
                                <Carousel.Caption>
                                    <h3>Battle Log</h3>
                                    <p>The Battle Log is the black window in the center of your screen.  All actions and results will be displayed here.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img width={900} height={500} className="carouselImg" alt="900x500" src="../static/img/PBApokemonInfo.jpg"/>
                                <Carousel.Caption>
                                    <h3>Pokemon Info</h3>
                                    <p>To the left of the Battle Log is the Pokemon Info window.  This window shows your currently selected pokemon and the opponents currently selected pokemon.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img width={900} height={500} className="carouselImg" alt="900x500" src="../static/img/PBAcmdBtns.jpg"/>
                                <Carousel.Caption>
                                    <h3>Pokemon Commands</h3>
                                    <p>Once you have joined a battle you will see a few buttons below the Battle Log. Click the button and the move will be set.  Clicking Confirm Move will let the system know you are ready to continue.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img width={900} height={500} className="carouselImg" alt="900x500" src="../static/img/PBAchat.jpg"/>
                                <Carousel.Caption>
                                    <h3>Chat</h3>
                                    <p>To the right of the Battle Log is our chat window.  Feel free to converse about Pokemon or talk trash. Please remember to login into Facebook to access chat functionallity and don't forget to talk to Professor Oak with the commands !! help, !! bike, !! gender, !! type.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img width={900} height={500} className="carouselImg" alt="900x500" src="../static/img/PBAmeetTheTeam.jpg"/>
                                <Carousel.Caption>
                                    <h3>Meet the team...</h3>
                                    <p>A ramshackle, slipshod group of data driven desperados formed through a mutual opposition of optional technologies and excessive strain.  
                                    The combination of Sean's overbearing enthusiasim and the team's all-around accommidating attitude led to a pleasantly suprising and unified vision for the project.
                                    We're proud of what we have created here and we hope you enjoy it too.
                                    </p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img width={900} height={500} className="carouselImg" alt="900x500" src="../static/img/slide1.jpg"/>
                                <Carousel.Caption>
                                    <h3>Technologies</h3>
                                    <p>We built the backend using Python and Flask to build the page and send information between multiple clients and the server.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img width={900} height={500} className="carouselImg" alt="900x500" src="../static/img/slide1.jpg"/>
                                <Carousel.Caption>
                                    <h3>Technologies... (part2)</h3>
                                    <p>For the actual pages we used React and Bootstrap extensively.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>
                    </div>
                    </Modal.Body>
                    
                    <Modal.Footer>
                       <Navbar inverse>
                            <Navbar.Header>
                                <Navbar.Toggle />
                            </Navbar.Header>
                            <Navbar.Collapse>
                                <Nav>
                                    <Navbar.Brand>
                                        <a onClick={this.close}>Spectate</a>
                                    </Navbar.Brand>
                                </Nav>
                                <Nav pullRight>
                                    <Navbar.Brand>
                                        <a onClick={this.joinGame}>Join Game</a>
                                    </Navbar.Brand>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                    </Modal.Footer>
                </Modal>
                
            </div>
           
        );
    }
    
}