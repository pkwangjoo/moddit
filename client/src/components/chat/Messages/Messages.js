import React, { Fragment, useRef, useEffect } from "react";

import Message from "./Message/Message";

import ScrollToBottom from "react-scroll-to-bottom";

import "./Messages.css";

const Messages = ({ messages }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="messages">
      {messages.map((message) => (
        <Message message={message} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;
