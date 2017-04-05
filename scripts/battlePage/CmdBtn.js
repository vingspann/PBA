import * as React from 'react';

import { Socket } from './Socket';

export class CmdBtn extends React.Component {
    constructor(props){
        super(props);
        this.state = {
             'move1' : 'move1',
             'move2' : 'move2',
             'move3' : 'move3',
             'move4' : 'move4'
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
        
        // Allows moves to be dynamically updated.
        Socket.on('updateMoves', (data) =>{
            this.setState({
                'move1' : data['move1'],
                'move2' : data['move2'],
                'move3' : data['move3'],
                'move4' : data['move4']
            })
        })
    }


    render() {
        var m1 = this.state.move1;
        var m2 = this.state.move2;
        var m3 = this.state.move3;
        var m4 = this.state.move4;
        
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <button id="move1" onClick={this.onClick1}>{m1}</button>
                    <button id="move2" onClick={this.onClick2}>{m2}</button>
                    <button id="move3" onClick={this.onClick3}>{m3}</button>
                    <button id="move4" onClick={this.onClick4}>{m4}</button>
                </form>
            </div>
        );
    }
}
