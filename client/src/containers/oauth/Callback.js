import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import auth0Client from './Auth';
import * as userApi from '../../api/UserApi'
import { connect } from 'react-redux'
import {
  setLoggedInUserId,
  setLoggedInUserFavMovies
} from '../../actions/User'

class Callback extends Component {
  async componentDidMount() {
    try {
      await auth0Client.handleAuthentication()
    } catch(error) {
      alert(`Could not login: ${error.error}`)
      this.props.history.replace('/')
      return
    }

    userApi.loginUser()
    .then(json => {
      this.props.setLoggedInUserId(json.userId)
      this.props.setLoggedInUserFavMovies(json.favoriteMovies)
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

const mapDispatchToProps = (dispatch) => (
  {
    setLoggedInUserId: (id) => dispatch(setLoggedInUserId(id)),
    setLoggedInUserFavMovies: (favMovies) => dispatch(setLoggedInUserFavMovies(favMovies))
  }
)

export default withRouter(connect(null, mapDispatchToProps)(Callback))