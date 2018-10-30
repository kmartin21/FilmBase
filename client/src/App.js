import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom'
import auth0Client from './oauth/Auth';
import NavBar from './containers/NavBar'
import Callback from './oauth/Callback'
import ProfilePage from './components/ProfilePage'
import HomePage from './components/HomePage'
import SecuredRoute from './components/SecuredRoute'
import * as userApi from './api/UserApi'
import { connect } from 'react-redux'
import {
  setLoggedInUserId,
  setLoggedInUserFavMovies
} from './actions/User'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checkingSession: true
    }
  }

  async componentDidMount() {
    if (this.props.location.pathname === '/callback') {
      this.setState({ checkingSession: false })
      return
    }
    try {
      await auth0Client.silentAuth()

      userApi.loginUser()
      .then(json => {
        this.props.setLoggedInUserId(json.userId)
        this.props.setLoggedInUserFavMovies(json.favoriteMovies)
        this.forceUpdate()
      })
      .catch(err => {
        alert(`CANT LOGIN: ${err.message}`)
      })
    } catch (err) {
      if (err.error === 'login_required') {
        this.setState({ checkingSession: false })
        return
      }
      console.log(err.message)
    }
    this.setState({ checkingSession: false })
  }

  render() {
    return (
      <div>
        <NavBar/>
        <Route exact path='/callback' component={Callback}/>
        <SecuredRoute path='/user/:id/profile'
          component={ProfilePage}
          checkingSession={this.state.checkingSession} />
        <SecuredRoute path='/'
          component={HomePage}
          checkingSession={this.state.checkingSession} />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    setLoggedInUserId: (id) => dispatch(setLoggedInUserId(id)),
    setLoggedInUserFavMovies: (favMovies) => dispatch(setLoggedInUserFavMovies(favMovies))
  }
)

export default withRouter(connect(null, mapDispatchToProps)(App));
