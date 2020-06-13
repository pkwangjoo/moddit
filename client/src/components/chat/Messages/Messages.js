import React, { Fragment } from "react";

import Message from "./Message/Message";

import ScrollToBottom from "react-scroll-to-bottom";

import "./Messages.css";

const Messages = ({ messages }) => (
  <ScrollToBottom className="messages">
    {messages.map((message) => (
      <Message message={message} />
    ))}
  </ScrollToBottom>
);

export default Messages;
