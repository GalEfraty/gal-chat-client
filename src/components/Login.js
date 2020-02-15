import React, { useState, useContext } from "react";
import axios from "axios";
import { authContext } from "../context/auth";
import LoginError from "./LoginError";
import "../styles/login.css";

const Login = ({ history }) => {
  const { changeUser } = useContext(authContext);
  const [nicknameState, setNicknameState] = useState("");
  const [errorState, setErrorState] = useState("");

  const onNicknameChange = e => {
    setErrorState("");
    setNicknameState(e.target.value);
  };

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const available = await axios.get(
        `https://gal-chat-server.herokuapp.com/api/users/isUserAvailable/${nicknameState}`
      );
      if (available.data.available === false) {
        return setErrorState(
          `${nicknameState} is taken. please choose another name`
        );
      }
      setErrorState("");
      const {
        data: { user }
      } = await axios.post(
        `https://gal-chat-server.herokuapp.com/api/users/findAndUpdateOrCreate/${nicknameState}`
      );
      localStorage.setItem("chatUser", JSON.stringify(user));
      changeUser(user);
      history.push("/");
    } catch (error) {
      console.log("error in handleLogin", error)
      setErrorState("unable to login, please try again later")
    }
  };

  return (
    <div className="login-main-wrapper bg-primary">
      <form
        onSubmit={handleLogin}
        className="login-form container md-6 xs-2 shadow p-3"
      >
        <h3>Login to chat</h3>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              Name
            </span>
          </div>
          <input
            type="text"
            pattern=".{3,}"
            required
            title="3 characters minimum"
            className="form-control"
            placeholder="Your Name"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={nicknameState}
            onChange={onNicknameChange}
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Let me in!
        </button>
        {errorState && <LoginError error={errorState} />}
      </form>
    </div>
  );
};
export default Login;
