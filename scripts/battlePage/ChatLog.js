import * as React from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import { Socket } from './Socket';
import { Button } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';

export class ChatLog extends React.Component {
    constructor(props){
        super(props);
        this.state = {
             value : '',
            'messages': []
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleKeyPress = this.handleKeyPress(this);
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
    
    handleKeyPress(target) {
        if(target.charCode==13){
                 target.preventDefault();
        
        // Prints to the chatlog without authentication
        console.log(this.state.value);
        Socket.emit('chatLogSubmit', {
            'name' : 'test',
            'text' : this.state.value
        });        
        this.setState({value:''});
        }

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
            <div>
            
                <div id="chatLog">
                    <ul> {messages} </ul>
                </div>
            
                <div id="input-group">
                    
                    <form>
                    
                        <FormGroup>
                            <InputGroup>
                                <FormControl type="text" value={this.state.value} onChange={this.handleChange} onKeyPress={this.handleKeyPress} placeholder="Enter message" />
                                <InputGroup.Button>
                                    <Button id= "chatSubmit" onClick={this.handleSubmit}>Enter!</Button>
                                </InputGroup.Button>
                            </InputGroup>
                        </FormGroup>
                    
                       
                        
                    </form>
                </div>
            
            </div>
            
        );
        
    }
}