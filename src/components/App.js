import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import Login from "./Login";
import Chat from "./Chat";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute"
import "../styles/app.css";


function App() {
  return (
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/" component={Chat} />
          <PublicRoute  exact path="/login" component={Login}/>
        </Switch>
      </BrowserRouter>
  );
}

export default App;
