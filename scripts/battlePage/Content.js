import * as React from 'react';
import { ChatLog } from './ChatLog';
import { CmdBtn } from './CmdBtn';
import { BattleLog } from './BattleLog';
import { YoPokemon } from './YoPokemon';
import { ActnBtn } from './ActnBtn';
import { Navbar } from 'react-bootstrap';
import { NavItem } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { FBLogin } from './FBLogin';


export class Content extends React.Component{
    constructor(props){
        super(props);
        
    };

    componentDidMount(){
      

    }
    
    
    render(){
        
        return (
            <div>
                <div id="navBar">
                <Navbar id="innerNavBar">
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#">About</a>
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
            </div>
           
        );
    }
    
}