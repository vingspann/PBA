import React from 'react';
import FacebookLogin from 'react-facebook-login';

 export class FBLogin extends React.Component {
    responseFacebook(response) {
      console.log(response);
    }

    render() {
      return (
        <FacebookLogin
          appId='1378809085491759'
          autoLoad={false}
          fields="name,email,picture"
          scope="public_profile,euser_friends,user_actions.books"
          callback={this.responseFacebook}
          cssClass="facebookLogin"
        />
      );
    }
  }