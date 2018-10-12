import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import auth0Client from './Auth';

class Callback extends Component {
  async componentDidMount() {
    try {
      await auth0Client.handleAuthentication()
    } catch(error) {
      alert(`Could not login: ${error.error}`)
      this.props.history.replace('/')
      return
    }

    fetch('http://localhost:7001/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: `${auth0Client.getProfile().name}`, username: `${auth0Client.getProfile().nickname}`})
    })
    .then(res => res.json())
    .then(json => {
      localStorage.setItem('userId', json.userId)
      localStorage.setItem('favoriteMovies', JSON.stringify(json.favoriteMovies))
      
      this.props.history.replace('/')
    })
    .catch(error => {
      alert(`ERROR: ${error.message}`)
      this.props.history.replace('/')
    })
  }

  render() {
    return (
      <p>Loading profile...</p>
    );
  }
}

export default withRouter(Callback);