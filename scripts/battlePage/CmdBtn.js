import * as React from 'react';

import { Socket } from './Socket';

export class CmdBtn extends React.Component {
    constructor(props){
        super(props);
        this.state = {
             
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);

    }
    
    
    handleSubmit(event) {
        event.preventDefault();

        console.log('A move was clicked.')

    }
    
    onClick1(){
        Socket.emit('battleLog', {'text' : 'Button 1 clicked.'});
        console.log('Button 1 clicked.')
    }
    
    onClick2(){
        console.log('Button 2 clicked.')
        Socket.emit('battleLog', {'text' : 'Button 2 clicked.'});
    }
    
    onClick3(){
        console.log('Button 3 clicked.')
        Socket.emit('battleLog', {'text' : 'Button 3 clicked.'});
    }
    
    onClick4(){
        console.log('Button 4 clicked.')
        Socket.emit('battleLog', {'text' : 'Button 4 clicked.'});
    }

    componentDidMount(){
        
    }


    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <button id="move1" onClick={this.onClick1}>Move1</button>
                    <button id="move2" onClick={this.onClick2}>Move2</button>
                    <button id="move3" onClick={this.onClick3}>Move3</button>
                    <button id="move4" onClick={this.onClick4}>Move4</button>
                </form>
            </div>
        );
    }
}
