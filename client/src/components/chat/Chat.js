import React, { Fragment, useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import io from "socket.io-client";
import ScrollToBottom, { useScrollToBottom } from "react-scroll-to-bottom";

import {
  getChatMessages,
  udpateChatMessages,
  clearChatMessages,
} from "../../actions/chat";
import Messages from "./Messages/Messages";
import { Redirect } from "react-router-dom";
import { clearMPost } from "../../actions/marketplace";
import { serializeUser } from "passport";

let socket = null;
const Chat = ({
  auth,
  chat: { chatMessages },
  chatRoom: { chatRoom, loading },
  getChatMessages,
  udpateChatMessages,
  clearChatMessages,
}) => {
  const [chatMessage, setChatMessage] = useState({
    text: "",
  });

  const { text } = chatMessage;

  useEffect(() => {
    socket = io.connect("/");
    chatRoom && getChatMessages(chatRoom._id);

    chatRoom && socket.emit("join", { room: chatRoom, user: auth.user });

    socket.on("message", (msg) => {
      udpateChatMessages(msg);
    });

    return () => {
      socket.emit("disconnectUser", {user: auth.user});
      socket.disconnect();
      clearChatMessages();
    };
  }, []);

  const onChange = (e) =>
    setChatMessage({ ...chatMessage, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    socket.emit("sendMessage", {
      text: text,
      sender: auth.user,
      chatRoom: chatRoom,
    });
    setChatMessage({ text: "" });
  };

  const Header = () => {
    return (
      <div class="ui fluid card">
        <div class="content">
          <div class="header">{chatRoom.name}</div>
          <div class="meta">
            {chatRoom.private && <span class="category">private</span>}
          </div>
        </div>
      </div>
    );
  };

  if (!auth.isAuthenticated) {
    return <Redirect to="/" />;
  }

  if (!chatRoom) {
    return <Redirect to="/chat/join" />;
  }
  return (
    <div>
      <Header />

      <div
        style={{
          height: "550px",
          overflow: "scroll",
          overflow: "hidden",
        }}
      >
        {chatMessages && (
          <div>
            <Messages messages={chatMessages} />
          </div>
        )}
      </div>

      <form onSubmit={onSubmit}>
        <div class="ui fluid input">
          <input
            type="text"
            name="text"
            value={text}
            onChange={onChange}
            placeholder="chat"
          />
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  chat: state.chat,
  chatRoom: state.chatRoom,
});

export default connect(mapStateToProps, {
  getChatMessages,
  udpateChatMessages,
  clearChatMessages,
})(Chat);
