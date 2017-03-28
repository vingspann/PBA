import * as React from 'react';
import { ChatLog } from './ChatLog';

export class Content extends React.Component{
    constructor(props){
        super(props);
        
    };
    
    componentDidMount(){
        
    }
    
    
    render(){
        
        return (
            <div>
                <div id="info">
                    <div id="pokeInfo">pokemon info div</div>
                    <div id="battleLog">battle log div</div>
                    <div id="chat">{ ChatLog }</div>
                </div>
                <div id="cmdBtn">
                    <div class="actionBtn">move1</div>
                    <div class="actionBtn">move2</div>
                    <div class="actionBtn">move3</div>
                    <div class="actionBtn">move4</div>
                </div>
                <div id="gameAction">
                    <div class="actionBtn">Switch</div>
                    <div class="actionBtn">Surrender</div>
                </div>
            </div>
           
        );
    }
    
}