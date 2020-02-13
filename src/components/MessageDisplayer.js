import React, { useContext } from "react";
import { authContext } from "../context/auth";

const MessageDisplayer = ({ message }) => {
  const { currentUser } = useContext(authContext);
  const me = <i className="fas fa-user"></i>;
  const others = <i className="far fa-user"></i>;

  const avatar = currentUser.id === message["user"]["id"] ? me : others;
  return (
    <div className="chat-MessageDisplayer-wrapper">
      <span className="chat-MessageDisplayer-avatar-element">{avatar}</span>
      <span className="chat-MessageDisplayer-username-element"> {message["user"]["name"] + ": "}</span>
      <span>{message["content"]}</span>
    </div>
  );
};

export default MessageDisplayer;
