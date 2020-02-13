import React, { useContext } from "react";
import { authContext } from "../context/auth";

const OnlineUser = ({ user }) => {
  const { currentUser } = useContext(authContext);
  const isMe = currentUser.id === user["id"];
  const me = <i className="fas fa-user chat-Chat-settings-icon-buttons-online"></i>;
  const others = <i className="far fa-user chat-Chat-settings-icon-buttons-online"></i>;
  const avatar = isMe ? me : others;

  return (
    <div className="chat-OnlineUser-wrapper">
      {avatar} {user.name} {isMe && "(me)"}
    </div>
  );
};

export default OnlineUser;
