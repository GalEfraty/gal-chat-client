import React from "react";
import "../styles/login.css"

const LoginError = ({ error }) => {
  return (
    <div className="login-loginError container">
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    </div>
  );
};

export default LoginError;
