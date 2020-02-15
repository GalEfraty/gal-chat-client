import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { authContext } from "../context/auth";
import SendMessageForm from "./SendMessageForm";
import MessageDisplayer from "./MessageDisplayer";
import OnlineUsersList from "./OnlineUsersList";

const Chat = () => {
  const { currentUser, changeUser } = useContext(authContext);
  const [messagesState, setMessagesState] = useState("");
  const [onlineUsersState, setOnlineUsersState] = useState("");
  const [showOnlineUsersState, setShowOnlineUsersState] = useState(false);
  const numberOfMessagesToRetrive = 10;

  window.onbeforeunload = function(e) {
    e.preventDefault();
    return "Please press the Exit button if you want to leave the chat";
}
  // window.addEventListener('beforeunload', function (e) {
  //   e.preventDefault();
  //   e.returnValue = ;
  // });

  useEffect(() => {
    fetchChat();
  }, []);

  useEffect(() => {
    setInterval(() => {
      fetchChat();
    }, 5000);
  }, []);

  const fetchChat = async () => {
    try {
      axios
        .get(
          `https://gal-chat-server.herokuapp.com/api/users/getOnlineUsersAndCount/${currentUser.id}`
        )
        .then(result => {
          setOnlineUsersState(result.data);
        });
      axios
        .get(
          `https://gal-chat-server.herokuapp.com/api/messages/getLastMessages/${numberOfMessagesToRetrive}/${currentUser.id}`
        )
        .then(result => {
          setMessagesState(result.data.messages.reverse());
        });
    } catch (error) {
      console.log("error in fetchChat: ", error);
      window.alert("unable to get chat detaild.. try again later");
    }
  };

  const onExitChat = () => {
    try {
      axios
        .put(
          `https://gal-chat-server.herokuapp.com/api/users/updateUserToOffline/${currentUser.id}`
        )
        .then(() => {
          localStorage.removeItem("chatUser");
          changeUser();
        });
    } catch (error) {
      console.log("error in onExitChat: ", error);
      window.alert("unable to logout user");
    }
  };

  const renderMessages = () => {
    const messageComponents = [];
    for (let message of messagesState) {
      messageComponents.push(
        <MessageDisplayer key={message["id"]} message={message} />
      );
    }
    if (messageComponents.length === 0) {
      return <div>{"chat is empty, Be the first to say something"}</div>;
    }
    return messageComponents;
  };

  const toggleOnlineUsers = () => {
    showOnlineUsersState
      ? setShowOnlineUsersState(false)
      : setShowOnlineUsersState(true);
  };

  return (
    <div className="container-fluid bg-primary chat-Chat-main-wrapper">
      <div className="container">
        <div className="rounded border border-primary container chat-welcome-wrapper">
          <h5 className="text-light">Welcome to Chat, {currentUser.name}</h5>
        </div>
        <div className="container  chat-Chat-settings-wrapper">
          <button
            className="btn btn-outline-primary rounded bg-light"
            onClick={toggleOnlineUsers}
          >
            <i className="fas fa-wifi chat-Chat-settings-icon-buttons-online"></i>
            {onlineUsersState.count} Online Users
          </button>
          <button
            className="btn btn-outline-primary rounded float-right bg-light"
            onClick={onExitChat}
          >
            Exit{" "}
            <i className="fas fa-sign-out-alt chat-Chat-settings-icon-buttons-exit"></i>
          </button>
        </div>
        {showOnlineUsersState && (
          <OnlineUsersList onlineUsers={onlineUsersState} />
        )}
        <div className="container border border-secondary rounded chat_Chat-messages-wrapper bg-light overflow-auto">
          {messagesState && renderMessages()}
        </div>
        <SendMessageForm fetchChat={fetchChat} />
      </div>
    </div>
  );
};

export default Chat;
