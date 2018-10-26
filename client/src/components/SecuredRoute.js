import React from 'react';
import {Route} from 'react-router-dom';

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