import React from 'react';
import PropTypes from 'prop-types'
import {Route} from 'react-router-dom';

const SecuredRoute = ({ path, Component, checkingSession }) => (
    <Route exact path={path} render={() => {
        if (checkingSession) return <div></div>
        return <Component />
    }} />
)

SecuredRoute.propTypes = {
  path: PropTypes.string.isRequired,
  Component: PropTypes.element.isRequired,
  checkingSession: PropTypes.bool.isRequired
}

export default SecuredRoute