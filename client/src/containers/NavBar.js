import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import auth0Client from './oauth/Auth'
import { connect } from 'react-redux'
import {
  logoutUser
} from '../actions/User'
import downArrowWhite from '../images/down-arrow-white.svg'

function NavBar(props) {
  const signOut = () => {
    auth0Client.signOut()
    props.logoutUser()
    props.history.replace('/')
  }

  return (
    <nav>
      <div className="nav__container">
        <div className="nav__title-container">
          <Link className="nav__title" to="/">
              <h3>FilmBase</h3>
          </Link>
        </div>
        
        {
          !auth0Client.isAuthenticated() &&
          <div className="nav__login-container">
            <button className="nav__login-btn" onClick={auth0Client.signIn}>Sign In</button>
          </div>
        }

        {
          auth0Client.isAuthenticated() &&
          <div className="nav__login-container">
            <img className="nav__user-image" src={`${props.imageUrl}`} alt='Logged in user'/>
            <Link className="nav__user-name" to={`/user/${props.userId}/profile`}>
              <h4>{props.name}</h4>
            </Link>
            <img className="nav__more-options-btn" src={downArrowWhite} alt='More options' onClick={() => signOut()}/>
            {/* <button onClick={() => {signOut()}}>Sign Out</button> */}
          </div>
        }
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