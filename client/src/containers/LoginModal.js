import React, { Component } from 'react'
import auth0Client from '../containers/oauth/Auth'
import PropTypes from 'prop-types'

class LoginModal extends Component {

    constructor(props) {
        super(props)

        this.setWrapperRef = this.setWrapperRef.bind(this)
        this.handleClickOutside = this.handleClickOutside.bind(this)
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }
    
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    
    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            alert('You clicked outside of me!');
        }
    }

    render = () => (
        <div ref={this.setWrapperRef} className="login-modal__container">
            <button className="close" onClick={this.props.onClose}/>
            <h2 className="login-modal__header">Filmbase</h2>
            <p className="login-modal__description">Sign in to favorite movies, see your collection of favorite movies, other users movie opinions and discover movies you haven't seen yet.</p>
            <button className="login-modal__login-btn" onClick={auth0Client.signIn}>Sign In With Google</button>
        </div>
    )
}

LoginModal.propTypes = {
    onClose: PropTypes.func.isRequired
}

export default LoginModal










