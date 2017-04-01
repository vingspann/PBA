import * as React from 'react';
import { Socket } from './Socket';

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
                {n.character}: {n.health}
                
            </li>
        );
        
        return (
            <div>
                <div>
                    <ul> {pokemon} </ul>
                </div>
            </div>
        );
    }
}
