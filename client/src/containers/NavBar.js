import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import auth0Client from './oauth/Auth'
import { connect } from 'react-redux'
import {
  logoutUser
} from '../actions/User'

function NavBar(props) {
  const signOut = () => {
    auth0Client.signOut()
    props.logoutUser()
    props.history.replace('/')
  }

  return (
    <nav>
        <Link className="nav-brand" to="/">
          FilmBase
        </Link>
      
      {
        !auth0Client.isAuthenticated() &&
        <button className="nav-login" onClick={auth0Client.signIn}>Sign In</button>
      }
      {
        auth0Client.isAuthenticated() &&
        <div>
          <Link className="nav-loggedIn"to={`/user/${props.userId}/profile`}>
            {auth0Client.getProfile().name}
          </Link>
          <button onClick={() => {signOut()}}>Sign Out</button>
        </div>
      }
    </nav>
  )
}

const mapStateToProps = (state) => (
  {
    userId: state.loggedInUserInfo.id
  }
)

const mapDispatchToProps = (dispatch) => (
  {
      logoutUser: () => dispatch(logoutUser())
  }
)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar))