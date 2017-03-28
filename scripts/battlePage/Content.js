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
            { ChatLog }
            </div>
        );
    }
    
}