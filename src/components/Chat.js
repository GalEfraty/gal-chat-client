import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { authContext } from "../context/auth";
import SendMessageForm from "./SendMessageForm";
import MessageDisplayer from "./MessageDisplayer";

const Chat = () => {
  const { currentUser, changeUser } = useContext(authContext);
  const [messagesState, setMessagesState] = useState("");
  const [onlineUsersState, setOnlineUsersState] = useState("");
  const numberOfMessagesToRetrive = 10;

  const onExitChat = () => {
    changeUser("");
  };

  const fetchChat = async () => {
    axios
      .get(
        `https://gal-chat-server.herokuapp.com/api/users/getOnlineUsersAndCount/${currentUser.id}`
      )
      .then(result => {
        setOnlineUsersState(result.data); //count: X, users: [{}]
      });
    axios
      .get(
        `https://gal-chat-server.herokuapp.com/api/messages/getLastMessages/${numberOfMessagesToRetrive}/${currentUser.id}`
      )
      .then(result => {
        setMessagesState(result.data.messages.reverse());
      });
  };

  const renderMessages = () => {
    const messageComponents = [];
    // console.log(messagesState)
    // console.log("type: " + typeof messagesState)
    for (let message of messagesState) {
        // console.log(message)

      messageComponents.push(<MessageDisplayer key={message["id"]} message={message} />);
    }
    return messageComponents;
    // return "hi"
  };

  useEffect(() => {
    fetchChat();
  }, []);

  return (
    <div className="container">
      <h3 className="text-primary">welcome to Chat, {currentUser.name}</h3>
      <button className="btn btn-primary rounded" onClick={onExitChat}>
        exit
      </button>
      <div className="container border border-secondary rounded bg-primary">{messagesState && renderMessages()}</div>
      <SendMessageForm fetchChat={fetchChat} />
    </div>
  );
};

export default Chat;
