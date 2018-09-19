import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import NavBar from './containers/NavBar'
import Callback from './Callback'
import HomePage from './components/HomePage'

class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <Route exact path='/callback' component={Callback}/>
        <HomePage />
      </div>
    );
  }
}

export default App;
