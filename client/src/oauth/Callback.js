import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import auth0Client from './Auth';

class Callback extends Component {
  async componentDidMount() {
    await auth0Client.handleAuthentication();
    fetch('http://localhost:7001/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: `${auth0Client.getProfile().name}`, username: `${auth0Client.getProfile().nickname}`})
    }).then(res => {
      console.log("RESPONSE: ", res)
      this.props.history.replace('/')
    })
    .catch(error => console.log("ERROR: ", error))
  }

  render() {
    return (
      <p>Loading profile...</p>
    );
  }
}

export default withRouter(Callback);