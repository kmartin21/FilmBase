import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import NavBar from './containers/NavBar'
import Callback from './oauth/Callback'
import ProfilePage from './components/ProfilePage'
import HomePage from './components/HomePage'

class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <Route exact path='/callback' component={Callback}/>
        <Route exact path='/user/:id' component={ProfilePage}/>
        <Route exact path='/' component={HomePage}/>
      </div>
    );
  }
}

export default App;
