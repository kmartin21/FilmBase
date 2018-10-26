import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom'
import auth0Client from './oauth/Auth';
import NavBar from './containers/NavBar'
import Callback from './oauth/Callback'
import ProfilePage from './components/ProfilePage'
import HomePage from './components/HomePage'
import SecuredRoute from './components/SecuredRoute'
import * as userApi from './api/UserApi'
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

      const {dispatch} = this.props
      userApi.loginUser()
      .then(json => {
        dispatch(setLoggedInUserId(json.userId))
        dispatch(setLoggedInUserFavMovies(json.favoriteMovies))
        this.forceUpdate()
      })
      .catch(err => {
        alert(`ERROR: ${err.message}`)
      })
    } catch (err) {
      if (err.error === 'login_required') {
        this.setState({ checkingSession: false })
        return
      }
      console.log(err.error)
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

export default withRouter(App);
