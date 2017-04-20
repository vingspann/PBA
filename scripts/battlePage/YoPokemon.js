import * as React from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import { Socket } from './Socket';
import { ProgressBar } from 'react-bootstrap';

export class YoPokemon extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            // 'pokemon' : []
            'pokemon': [{ 'character' : 'Pikachu', 'health' : '0.90', 'spriteLink' : 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png'}
                      ,{ 'character' : 'Charazard', 'health' : '0.80', 'spriteLink' : 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png'}],
            'opPokemon' :  [{ 'character' : 'Dragonite', 'health' : '0.69', 'spriteLink' : 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png'}
                      ,{ 'character' : 'Scyther', 'health' : '0.71', 'spriteLink' : 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/123.png'}]
                     
        };
    }
    componentDidMount(){
        // Allows moves to be dynamically updated.
        Socket.on('updatePokemon', (data) =>{
            this.setState({
                'name'  : data['name'],
                'link'  : data['link'],
                'maxHealth': data['maxHealth'],
                'curHealth' : data['curHealth']
                
            })
        })
        
        // Allows moves to be dynamically updated.
        Socket.on('updateOpPokemon', (data) =>{
            this.setState({
                'name'  : data['name'],
                'link'  : data['link'],
                'health': data['health']
                
            })
        })
    }
    render() {
        let pokemon = this.state.pokemon.map((n, index) =>
            <li key={index}>
                <div id="HealthLog">
                    <img className="images" src={n.spriteLink}/> 
                  
                </div>
                <ProgressBar>
                    <ProgressBar bsStyle="success" now={n.health*100} label={`${n.health*100}%`} key={1} />
                    <ProgressBar bsStyle="danger" now={100 - (n.health*100)} key={2} />
                </ProgressBar>
            </li>
        );
        let opPokemon = this.state.opPokemon.map((n, index) =>
            <li key={index}>
                
                <div id="opHealthLog">
                    <p id="pokemonInfoHeader">{n.character} : {n.health}</p>
                </div>
            </li>
            
        );
        
        return (
            <div>
                <h2 id="pokemonInfoHeader">Pokemon</h2>
                <div>
                    <ul> {pokemon} </ul>
                    <h4 id="pokemonInfoHeader">Opponent Pokemon</h4>
                    <ul> {opPokemon} </ul>
                    
                </div>
            </div>
        );
    }
}
