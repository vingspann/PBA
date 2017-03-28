import * as React from 'react';

export class ChatLog extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            'messages': [],
            'value': ''
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.hangleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount(){
        
    
    }

    // Handles 
    handleSubmit(event){
        event.preventDefault();
        
        // Prints to the chatlog without authentication
        this.state.messages.push({'name': 'test', 'messages' : this.state.value});
        this.setState({'value':''});
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
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" value={this.state.value} onChange={this.handleChange} placeholder="Enter message">
                        </input>
                        <button> Enter! </button>
                    </form>
                </div>
            
            </div>
            
        );
        
    }
}