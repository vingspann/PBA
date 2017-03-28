import * as React from 'react';


export class yoPokemon extends React.Component {
    constructor(props){
        super(props);
        
    };
    
    componentDidMount(){
        
    }
    render() {
        return (
            <div>
                <h1>pokemon</h1>
                <div>
                     'Pikachu'
                     '90/100'
                     'Charizard'
                     '80/100'
                     'blastoise'
                     '80/100'
                </div>
            </div>
        );
    }
}
