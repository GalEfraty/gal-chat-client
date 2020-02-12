import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./Login";
import Chat from "./Chat";
import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "../context/auth";
import "../styles/app.css";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <PrivateRoute exact path="/" component={Chat} />
        <Route exact path="/login" component={Login} />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
