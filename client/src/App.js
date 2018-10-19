import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom'
import auth0Client from './oauth/Auth';
import NavBar from './containers/NavBar'
import Callback from './oauth/Callback'
import ProfilePage from './components/ProfilePage'
import HomePage from './components/HomePage'
import SecuredRoute from './components/SecuredRoute/SecuredRoute'

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
      this.forceUpdate()
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
    );
  }
}

export default withRouter(App);
