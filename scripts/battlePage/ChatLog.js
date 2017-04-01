import * as React from 'react';

import { Socket } from './Socket';

export class ChatLog extends React.Component {
    constructor(props){
        super(props);
        this.state = {
             value : '',
            'messages': []
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);

    }
    
    componentDidMount(){
        
        Socket.on('chatLogEmit', (data) =>{
        this.state.messages.push({'name': data['name'], 'text' : data['text']});
        this.forceUpdate();
        });
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    
    handleSubmit(event){
        event.preventDefault();
        
        // Prints to the chatlog without authentication
        console.log(this.state.value);
        Socket.emit('chatLogSubmit', {
            'name' : 'test',
            'text' : this.state.value
        });        
        this.setState({value:''});
    }
    
    render(){
        
        let messages = this.state.messages.map((n, index) =>
            <li key={index}>
                {n.name}: {n.text}
                
            </li>
        );
        
        
        return(
            <div id="chatArea">
            
                <div id="chatLog">
                    <ul> {messages} </ul>
                </div>
            
                <div>
                    <form>
                        <input type="text" value={this.state.value} onChange={this.handleChange} placeholder="Enter message">
                        </input>
                        <button onClick={this.handleSubmit}> Enter! </button>
                    </form>
                </div>
            
            </div>
            
        );
        
    }
}