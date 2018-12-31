import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom'
import auth0Client from './oauth/Auth'
import { connect } from 'react-redux'
import {
  logoutUser
} from '../actions/User'
import downArrowWhite from '../images/down-arrow-white.svg'
import logo from '../images/logo.png'
import PropTypes from 'prop-types'

class NavBar extends Component {
  static propTypes = {
    userId: PropTypes.string,
    name: PropTypes.string,
    imageUrl: PropTypes.string,
    logoutUser: PropTypes.func.isRequired
  }

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

  refreshPage = () => {
    window.location.reload()
  }

  render = () => (
      <nav>
        <div className="nav__container">
          <div className="nav__title-container">
            <Link onClick={this.refreshPage} className="nav__title" to="/">
                <img className="nav__logo" src={logo} alt='Logo'/>
                <h3>Filmbase</h3>
            </Link>
          </div>
          
          {!auth0Client.isAuthenticated() &&
            <div className="nav__login-container">
              <button className="nav__login-btn" onClick={auth0Client.signIn}>Sign In With Google</button>
            </div>
          }

          {auth0Client.isAuthenticated() &&
            <div className="nav__login-container">
              <img className="nav__user-image" src={`${this.props.imageUrl}`} alt='User'/>
              <Link className="nav__user-name" to={`/user/${this.props.userId}/profile`}>
                <h4>{this.props.name}</h4>
              </Link>
              <img className="nav__more-options-btn" src={downArrowWhite} alt='Options' onClick={() => this.setShowDropdown()}/>
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