import React from 'react';
import { Socket } from './Socket';
import FacebookLogin from 'react-facebook-login';

 export class FBLogin extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            'FBkey': ''
        };
        
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    
    componentDidMount() {
      Socket.on('FBkey', (data) =>{
            this.setState({
                'FBkey'  : data['key']
                
            });
        });
    }
    
    
   
    responseFacebook(response) {
      console.log(response);
    }

    render() {
      return (
        <FacebookLogin
          appId='1981325768753022'
          autoLoad={false}
          fields="name,email,picture"
          scope="public_profile,euser_friends,user_actions.books"
          callback={this.responseFacebook}
          reAuthenticate={true}
          cssClass="facebookLogin"
        />
      );
    }
  }