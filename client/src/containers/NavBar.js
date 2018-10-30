import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import auth0Client from '../oauth/Auth'
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
    <nav className="navbar navbar-dark bg-primary fixed-top">
      <Link className="navbar-brand" to="/">
        FilmBase
      </Link>
      {
        !auth0Client.isAuthenticated() &&
        <button className="btn btn-dark" onClick={auth0Client.signIn}>Sign In</button>
      }
      {
        auth0Client.isAuthenticated() &&
        <div>
          <Link className="mr-2 text-white" to={`/user/${props.userId}/profile`}>
            {auth0Client.getProfile().name}
          </Link>
          <button className="btn btn-dark" onClick={() => {signOut()}}>Sign Out</button>
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