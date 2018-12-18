import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom';
import auth0Client from './Auth';
import * as userApi from '../../api/UserApi'
import { connect } from 'react-redux'
import {
  setLoggedInUserInfo
} from '../../actions/User'

class Callback extends Component {
  static propTypes = {
    setLoggedInUserInfo: PropTypes.func.isRequired
  }

  async componentDidMount() {
    try {
      await auth0Client.handleAuthentication()
    } catch(error) {
      alert(`Could not login: ${error.error}`)
      this.props.history.replace('/')
      return
    }

    userApi.loginUser()
    .then(json => {
      this.props.setLoggedInUserInfo(json)
      this.props.history.replace('/')
    })
    .catch(err => {
      alert(`ERROR: ${err.message}`)
      this.props.history.replace('/')
    })
  }

  render() {
    return (
      <div></div>
    )
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    setLoggedInUserInfo: (json) => dispatch(setLoggedInUserInfo(json))
  }
)

export default withRouter(connect(null, mapDispatchToProps)(Callback))