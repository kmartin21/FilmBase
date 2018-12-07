import React, { Component } from 'react'
import auth0Client from '../containers/oauth/Auth'

class LoginModal extends Component {

    render() {
        const { onClose } = this.props

        return (
            <div className="login-modal__container">
                <a href="#" className="close" onClick={onClose}/>
                <h2 className="login-modal__header">Filmbase</h2>
                <p className="login-modal__description">Sign in to favorite movies, see your collection of favorite movies, other users movie opinions and discover movies you haven't seen yet.</p>
                <button className="login-modal__login-btn" onClick={auth0Client.signIn}>Sign in with Google</button>
            </div>
        )
    }
}

export default LoginModal










