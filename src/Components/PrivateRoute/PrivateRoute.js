import React from 'react';
import { useContext } from 'react';
import {
    Route,
    Redirect
  } from "react-router-dom";
import { UserContext } from '../../App';

function PrivateRoute({ children, ...rest }) {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
      <Route
        {...rest}
        render={({ location }) =>
          loggedInUser.displayName ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

export default PrivateRoute;