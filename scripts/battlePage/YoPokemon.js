import * as React from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import { Socket } from './Socket';
import { ProgressBar } from 'react-bootstrap';

export class YoPokemon extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            
             'maxHealth0' : 'maxHealth0',
             'link0' : 'link0',
             'maxHealth1' : 'maxHealth1',
             'link1' : 'link1',
             'opCharacter0' : 'opCharacter0',
             'ophealth0' : 'ophealth0',
             'opCharacter1' : 'opCharacter1',
             'ophealth1' : 'ophealth1'
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        
    }
    
    componentDidMount(){
        Socket.emit('updateInfo')
        // Allows moves to be dynamically updated.
        Socket.on('getBothPokemon', (data) =>{
            this.setState({
                'curHealth0': data['curHealth0'],
                'maxHealth0': data['maxHealth0'],
                'link0'  : data['link0'],
                'curHealth1': data['curHealth1'],
                'maxHealth1': data['maxHealth1'],
                'link1'  : data['link1'],
            })
        })
        
        
        // Allows moves to be dynamically updated.
        Socket.on('getBothOpPokemon', (data) =>{
            this.setState({
                'opCharacter0'  : data['name0'],
                'health0': data['health0'],
                'opCharacter1'  : data['name1'],
                'health1': data['health1']
                
            })
        })
    }
    render() {
        let link0 = this.state.link0;
        let maxHealth0 = this.state.maxHealth0;
        let link1 = this.state.link1;
        let maxHealth1 = this.state.maxHealth1;
               
        let opCharacter0 = this.state.opCharacter0;
        let health0 = this.state.health0;
        let opCharacter1 = this.state.opCharacter1;
        let health1 = this.state.health1;
        console.log(link0);
                
            
        // sorry i hard coded the indexes and passed both individually.
        // Its a little wierd with the opp charaters until both users are online. 
        return (
            <div>
            
                <h3 id="pokemonInfoHeader">Pokemon</h3>
                <div>
                    <img className="images" src={link0}/> 
                    <ProgressBar>
                        <ProgressBar bsStyle="success" now={maxHealth0*100} label={`${maxHealth0*100}%`} key={1} />
                        <ProgressBar bsStyle="danger" now={100 - (maxHealth0*100)} key={2} />
                    </ProgressBar>
                    <img className="images" src={link1}/>
                    <ProgressBar>
                        <ProgressBar bsStyle="success" now={maxHealth1*100} label={`${maxHealth1*100}%`} key={1} />
                        <ProgressBar bsStyle="danger" now={100 - (maxHealth1*100)} key={2} />
                    </ProgressBar>
                </div>
                <h3 id="pokemonInfoHeader">Opponent Pokemon</h3>
                <div>
                        <p id="pokemonInfoHeader">{opCharacter0} : {health0}</p>
                        <p id="pokemonInfoHeader">{opCharacter1} : {health1}</p>
                </div>
                
            </div>
        );
    }
}