import * as React from '../../node_modules/react';

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
           this.state.log.push({'text' : data['text']});
           this.forceUpdate();
           this.updateScroll();
        });
        Socket.on('battleLogReset', (data) =>{
            this.setState({ 'log': [] });
        });
    }
    
    updateScroll(){
        var element = document.getElementById("battleLog");
        element.scrollTop = element.scrollHeight;
    }

    render(){
        
        let log = this.state.log.map((n, index) =>
            <li key = {index}>
                {n.text}
            </li>
        );
    
        return(
        
            <div id="Log">
                <ul> {log} </ul>
            </div>
        
        );
    }
}
