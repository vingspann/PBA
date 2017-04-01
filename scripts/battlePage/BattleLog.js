import * as React from 'react';

import { Socket } from './Socket';

export class BattleLog extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            'log': []
        };
        
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    
    componentDidMount(){
        
        Socket.on('battleLogEmit', (data) =>{
           this.state.log.push({'text' : data['text']})
           this.forceUpdate();
        });
    }

    render(){
        
        let log = this.state.log.map((n, index) =>
            <li key = {index}>
                {n.text}
            </li>
        );
    
        return(
        
            <div id="battleLog">
                <ul> {log} </ul>
            </div>
        
        );
    }
}
