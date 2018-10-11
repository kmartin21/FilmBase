import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import NavBar from './containers/NavBar'
import Callback from './oauth/Callback'
import ProfilePage from './components/ProfilePage'
import HomePage from './components/HomePage'
import auth0Client from './oauth/Auth'

class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <Route exact path='/callback' component={Callback}/>
        <Route exact path='/user/:id/profile' component={ProfilePage}/>
        <Route exact path='/' component={HomePage}/>
      </div>
    );
  }
}

export default App;
