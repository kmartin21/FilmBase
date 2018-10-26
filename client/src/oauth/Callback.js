import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import auth0Client from './Auth';
import * as userApi from '../api/UserApi'
import {
  setLoggedInUserId,
  setLoggedInUserFavMovies
} from '../actions/User'

class Callback extends Component {
  async componentDidMount() {
    try {
      await auth0Client.handleAuthentication()
    } catch(error) {
      alert(`Could not login: ${error.error}`)
      this.props.history.replace('/')
      return
    }

    const { dispatch } = this.props
    userApi.loginUser()
    .then(json => {
      dispatch(setLoggedInUserId(json.userId))
      dispatch(setLoggedInUserFavMovies(json.favoriteMovies))
      this.props.history.replace('/')
    })
    .catch(err => {
      alert(`ERROR: ${err.message}`)
      this.props.history.replace('/')
    })
  }

  render() {
    return (
      <div></div>
    )
  }
}

export default withRouter(Callback)