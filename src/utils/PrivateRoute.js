import React from 'react';
import { Route, Redirect } from 'react-router-dom';

/**
 * Component to handle authorized routing
 *
 * @param {*} { component: Component, ...rest }
 * @returns {jsx}
 */
const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = window.localStorage.getItem('token');

  return (
    token && (
      <Route
        {...rest}
        render={props => {
          if (token) {
            return <Component {...props} />;
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />
    )
  );
};

export default PrivateRoute;
