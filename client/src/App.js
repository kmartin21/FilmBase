import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import NavBar from './NavBar/NavBar'
import Callback from './Callback'

class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <Route exact path='/callback' component={Callback}/>
      </div>
    );
  }
}

export default App;
