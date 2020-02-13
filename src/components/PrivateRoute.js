import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { authContext } from "../context/auth";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { currentUser } = useContext(authContext);
  useEffect(() => {console.log("from PrivateRoute: ", currentUser)}, [currentUser])
  return (
    <Route
      {...rest}
      render={routeProps =>
        !!currentUser ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={"/login"} />
        )
      }
    />
  );
};

export default PrivateRoute;