import * as React from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import { Socket } from './Socket';
import { ProgressBar } from 'react-bootstrap';

export class YoPokemon extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            
             'character' : 'character',
             'link' : 'link',
             'health' : 'health',
             'opCharacter' : 'opCharacter',
             'opHealth' : 'opHealth',
             'opLink' : 'opLink' 
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        
    }
    
    componentDidMount(){
        Socket.emit('updateInfo')
        // Allows moves to be dynamically updated.
        Socket.on('updatePokemon', (data) =>{
            this.setState({
                'character'  : data['name'],
                'health': data['maxHealth'],
                'link' : data['link'],
                'opCharacter'  : data['opName'],
                'opHealth': data['opHealth'],
                'opLink' : data['opLink']
            })
        })
        
        
        // Allows moves to be dynamically updated.
        Socket.on('updateOpPokemon', (data) =>{
            this.setState({
                'opCharacter'  : data['name'],
                'opHealth': data['health'],
                'opLink' : data['link']
                
            })
        })
    }
    render() {
        let character = this.state.character;
        let link = this.state.link;
        let health = this.state.health;
               
        let opCharacter = this.state.opCharacter;
        let opHealth = this.state.opHealth;
        let opLink = this.state.opLink;
                
            
        // sorry i hard coded the indexes and passed both individually.
        // Its a little wierd with the opp charaters until both users are online. 
        return (
            <div>
            
                <h3 id="pokemonInfoHeader">Pokemon</h3>
                <div>
                    <img className="images" src={link}/> 
                    <p id="pokemonInfoHeader">{character}</p>
                    <ProgressBar>
                        <ProgressBar bsStyle="success" now={health*100} label={`${health*100}%`} key={1} />
                        <ProgressBar bsStyle="danger" now={100 - (health*100)} key={2} />
                    </ProgressBar>
                </div>
                <h3 id="pokemonInfoHeader">Opponent Pokemon</h3>
                <div>
                    <img className="images" src={opLink}/> 
                    <p id="pokemonInfoHeader">{opCharacter}</p>
                    <ProgressBar>
                        <ProgressBar bsStyle="success" now={opHealth*100} label={`${opHealth*100}%`} key={1} />
                        <ProgressBar bsStyle="danger" now={100 - (opHealth*100)} key={2} />
                    </ProgressBar>
                </div>
                
            </div>
        );
    }
}