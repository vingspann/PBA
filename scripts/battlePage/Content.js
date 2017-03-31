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
                    <div id="chat"><ChatLog/></div>
                </div>
                <div id="cmdBtn"><cmdBtn/></div>
                <div id="gameAction">
                   <div class="actionBtn"><input type="submit" value="Switch" /></div>
                   <div class="actionBtn"><input type="submit" value="Surrender" /></div>
                </div>
            </div>
           
        );
    }
    
}