import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { PlantContext } from '../contexts/PlantContext';

/**
 * Component to handle authorized routing
 *
 * @param {*} { component: Component, ...rest }
 * @returns {jsx}
 */
const PrivateRoute = ({ component: Component, ...rest }) => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  return (
    <Route
      {...rest}
      render={props => {
        if (token) {
          return <Component {...props} />;
        } else {
          return <Redirect to='/login' />;
        }
      }}
    />
  );
};

export default PrivateRoute;
