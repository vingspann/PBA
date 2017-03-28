import * as React from 'react';

import { Socket } from './Socket';

export class Submit extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    
    handleSubmit(event) {
        event.preventDefault();
        

        FB.getLoginStatus((response) => {
            if (response.status == 'connected') {
                Socket.emit('submit', {
                'google_user_token' : '',
                'facebook_user_token': response.authResponse.accessToken,
                'text': this.state.value
                });
            } else {
                let auth = gapi.auth2.getAuthInstance();
                let user = auth.currentUser.get();
                if (user.isSignedIn()) {
                    Socket.emit('submit', {
                        'google_user_token': user.getAuthResponse().id_token,
                        'facebook_user_token': '',
                        'text': this.state.value
                    });
                }
            } 
        });
        this.setState({'value':''});
        event.preventDefault();

    }
    componentDidMount(){
        
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" value={this.state.value} onChange={this.handleChange} name="message" placeholder="Enter message here">
                </input> 
                <button>Enter!</button>
            </form>
        );
    }
}
