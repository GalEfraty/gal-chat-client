import React, { useState, useContext } from "react";
import axios from "axios";
import { authContext } from "../context/auth";
import "../styles/login.css";

const Login = ({ history }) => {
  const { changeUser } = useContext(authContext);
  const [nicknameState, setNicknameState] = useState("");

  const onNicknameChange = e => {
    setNicknameState(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault()
    const {data: {user}} = await axios.post(`https://gal-chat-server.herokuapp.com/api/users/findAndUpdateOrCreate/${nicknameState}`)
    changeUser(user);
    history.push("/");
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
      </form>
    </div>
  );
};
export default Login;
