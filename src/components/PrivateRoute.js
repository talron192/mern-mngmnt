import React from '../../node_modules/react';
import { Route } from '../../node_modules/react-router-dom';
import { useAuth } from "./context/auth";


function PrivateRoute({ component: Component, ...rest }) {
  const isAuthenticated = useAuth();

  return(
    <Route {...rest} render={(props) => (
      <Component {...props} />
    )}
    />
  );
}

export default PrivateRoute;