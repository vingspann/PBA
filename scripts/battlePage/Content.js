import * as React from 'react';
import { ChatLog } from './ChatLog';
import { CmdBtn } from './CmdBtn';
import { YoPokemon } from './YoPokemon';

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
                    <div id="pokeInfo"><YoPokemon/></div>
                    <div id="battleLog">battle log div</div>
                    <div id="chat"><ChatLog/></div>
                </div>
                <div id="cmdButton"><CmdBtn/></div>
                <div id="gameAction">
                   <div class="actionBtn"><input type="submit" value="Switch" /></div>
                   <div class="actionBtn"><input type="submit" value="Surrender" /></div>
                </div>
            </div>
           
        );
    }
    
}