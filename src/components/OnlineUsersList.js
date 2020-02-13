import React from "react";
import OnlineUser from "./OnlineUser";

const OnlineUsersList = ({ onlineUsers }) => {
  const renderOnlineUsers = () => {
    let onlineUserComponents = [];

    for (let onlineUser in onlineUsers["users"]) {
      onlineUserComponents.push(
        <OnlineUser
          key={onlineUsers["users"][onlineUser]["id"]}
          user={onlineUsers["users"][onlineUser]}
        />
      );
    }

    return onlineUserComponents;
  };

  return <div>{renderOnlineUsers()}</div>;
};

export default OnlineUsersList;
