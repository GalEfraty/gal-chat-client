import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { authContext } from "../context/auth";

const PublicRoute = ({ component: RouteComponent, ...rest }) => {
  const { currentUser } = useContext(authContext);
  useEffect(() => {
    console.log("from PrivateRoute: ", currentUser);
  }, [currentUser]);
  return (
    <Route
      {...rest}
      render={routeProps =>
        !!currentUser ? (
          <Redirect to={"/"} />
        ) : (
          <RouteComponent {...routeProps} />
        )
      }
    />
  );
};

export default PublicRoute;
