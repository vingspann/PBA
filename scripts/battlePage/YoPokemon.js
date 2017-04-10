import * as React from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import { Socket } from './Socket';
import { ProgressBar } from 'react-bootstrap';

export class YoPokemon extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            'pokemon': [{ 'character' : 'Pikachu', 'health' : '0.90'},{ 'character' : 'Charazard', 'health' : '0.80'}]
        };
    }
    componentDidMount(){
        
    }
    render() {
        let pokemon = this.state.pokemon.map((n, index) =>
            <li key={index}>
                <div id="HealthLog">
                    {n.character} : {n.health}
                </div>
                <ProgressBar>
                    <ProgressBar bsStyle="success" now={n.health*100} label={`${n.health*100}%`} key={1} />
                    <ProgressBar bsStyle="danger" now={100 - (n.health*100)} key={2} />
                </ProgressBar>
            </li>
        );
        
        return (
            <div>
                <h2 id="pokemonInfoHeader">Pokemon</h2>
                <div>
                    <ul> {pokemon} </ul>
                </div>
            </div>
        );
    }
}
