import React from 'react'
import auth0Client from '../containers/oauth/Auth'

const LoginModal = ({ onClose }) => (
    <div className="login-modal__container">
        <a href="#" className="close" onClick={onClose}/>
        <h2 className="login-modal__header">Filmbase</h2>
        <p className="login-modal__description">Sign in to favorite movies, see your collection of favorite movies, other users movie opinions and discover movies you haven't seen yet.</p>
        <button className="login-modal__login-btn" onClick={auth0Client.signIn}>Sign In With Google</button>
    </div>
)

export default LoginModal










