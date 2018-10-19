import React from 'react';
import {Route} from 'react-router-dom';
import auth0Client from '../../oauth/Auth';

function SecuredRoute(props) {
  const {component: Component, path, checkingSession} = props;
  return (
    <Route exact path={path} render={() => {
        if (checkingSession) return <div></div>
        return <Component />
    }} />
  );
}

export default SecuredRoute;