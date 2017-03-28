import * as React from 'react';
import '../src/App.css';

import { Socket } from './Socket';
import { Submit } from './Submit';

export class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'messages': [],
            'facebook': [],
            'google': []
        };
    }

    componentDidMount() {
        
        Socket.on('chat', (data) => {
            this.setState({
                'messages': data['messages']
                
            });
        });
        Socket.on('users', (data) => {
            this.setState({
                'facebook': data['fusers'],
                'google': data['gusers']
            });
        });
        
        
        
    }
    
    

    render() {
        
        let messages = this.state.messages.map((n, index) =>
            <li key={index}>
                <img src={n.picture} className="userPic"/>
                {n.name}: {n.text} 
                <img src={n.image} />
                <a href={n.link}> {n.link} </a>
                
            </li>
        );
        let facebook = this.state.facebook.map((n,index) =>
            <li key={index}>
            <img src={n.picture} className="userPic"/>
            {n.name}
            </li>
        );
        let google = this.state.google.map((n,index) =>
            <li key={index}>
            <img src={n.picture} className="userPic"/>
            {n.name}
            </li>
        );
        
        let users = this.state.facebook.length
        users = users + this.state.google.length;
        return (
            <div>

                <div
                    className="fb-login-button"
                    data-max-rows="1"
                    data-size="medium"
                    data-show-faces="false"
                    data-auto-logout-link="true">
                 </div>
                <div
                    className="g-signin2"
                    data-theme="dark">
                </div>
                <div id="userArea">
                <h1> Users: {users} </h1>
                <h2> Facebook Users </h2>
                    <ul> {facebook} </ul>
                <h2> Google Users </h2>
                    <ul> {google} </ul>
                </div>
                <div id="chatArea">
                    <div id="messageArea">
                        <ul> {messages}</ul>
                    </div>
                
                <Submit />

                </div>
            </div>
        );
    }
}
