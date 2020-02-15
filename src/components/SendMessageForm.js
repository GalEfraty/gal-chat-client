import React, { useState, useContext } from "react";
import { authContext } from "../context/auth";
import axios from "axios";
import "../styles/chat.css"

const SendMessageForm = ({ fetchChat }) => {
  const { currentUser } = useContext(authContext);
  const [messageState, setMessageState] = useState("");

  const onMessageChange = e => {
    setMessageState(e.target.value);
  };

  const onSendMessage = (e) => {
    e.preventDefault();
    try {
      axios
      .post(
        `https://gal-chat-server.herokuapp.com/api/messages/sendmessage/${currentUser.id}`,
        { content: messageState }
      )
      .then(() => {
        setMessageState("");
        fetchChat();
      });
    } catch (error) {
      console.log("error in onSendMessage: ", error)
      window.alert("unable to send message, try again later")
      setMessageState("");
    }

  };

  return (
    <div className="chat_SendMessageForm-wrapper">
      <form className="input-group mb-3" onSubmit={onSendMessage}>
        <input
          required
          value={messageState}
          onChange={onMessageChange}
          type="text"
          className="form-control"
          placeholder="say something"
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-light"
            type="submit"
            id="button-addon2"
          >
            {" "}
            <i className="far fa-paper-plane"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendMessageForm;
