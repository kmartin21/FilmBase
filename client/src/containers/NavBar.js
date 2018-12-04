import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom'
import auth0Client from './oauth/Auth'
import { connect } from 'react-redux'
import {
  logoutUser
} from '../actions/User'
import downArrowWhite from '../images/down-arrow-white.svg'

class NavBar extends Component {

  constructor(props) {
    super(props)

    this.state = {
        showDropdown: false
    }
  }

  setShowDropdown = () => {
    this.setState({ showDropdown: !this.state.showDropdown })
  }

  signOut = () => {
    auth0Client.signOut()
    this.props.logoutUser()
    this.props.history.replace('/')
  }

  render = () => (
      <nav>
        <div className="nav__container">
          <div className="nav__title-container">
            <Link className="nav__title" to="/">
                <h3>FilmBase</h3>
            </Link>
          </div>
          
          {!auth0Client.isAuthenticated() &&
            <div className="nav__login-container">
              <button className="nav__login-btn" onClick={auth0Client.signIn}>Sign In</button>
            </div>
          }

          {auth0Client.isAuthenticated() &&
            <div className="nav__login-container">
              <img className="nav__user-image" src={`${this.props.imageUrl}`} alt='Logged in user'/>
              <Link className="nav__user-name" to={`/user/${this.props.userId}/profile`}>
                <h4>{this.props.name}</h4>
              </Link>
              <img className="nav__more-options-btn" src={downArrowWhite} alt='More options' onClick={() => this.setShowDropdown()}/>
            </div>
          }

          {this.state.showDropdown && (
            <ul className="nav__more-options-list">
              <li className="nav__more-options-list-item" onClick={() => this.signOut()}>Sign out</li>
            </ul>
          )}
        </div>
      </nav>
  )
}

const mapStateToProps = (state) => (
  {
    userId: state.loggedInUserInfo.id,
    name: state.loggedInUserInfo.name,
    imageUrl: state.loggedInUserInfo.imageUrl
  }
)

const mapDispatchToProps = (dispatch) => (
  {
      logoutUser: () => dispatch(logoutUser())
  }
)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar))