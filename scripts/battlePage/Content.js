import * as React from 'react';
import { ChatLog } from './ChatLog';
import { CmdBtn } from './CmdBtn';
import { BattleLog } from './BattleLog';
import { YoPokemon } from './YoPokemon';
import { ActnBtn } from './ActnBtn';
import * as ReactBootstrap from 'react-bootstrap';
import * as Router from 'react-router';
import { Navbar } from 'react-bootstrap';
import { NavItem } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
import { MenuItem } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import {  Route, RouteHandler, Link  } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

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
                <Navbar inverse collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#">About</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <LinkContainer to={{ pathname: 'https://pokeapi.co/'}}>
                                <NavItem eventKey={1} href="https://pokeapi.co/">API</NavItem>
                            </LinkContainer>
                            <LinkContainer to={{ pathname: 'https://github.com/vingspann/PBA'}}>
                                <NavItem eventKey={2} href="https://github.com/vingspann/PBA">GitHub</NavItem>
                            </LinkContainer>
                        </Nav>
                        <Nav pullRight>
                            <NavItem eventKey={2} href="#">FB Login Btn</NavItem>
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