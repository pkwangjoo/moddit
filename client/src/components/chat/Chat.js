import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import io from "socket.io-client";

import { getChatMessages, udpateChatMessages } from "../../actions/chat";
import Messages from "./Messages/Messages";
import { Redirect } from "react-router-dom";

let socket = null;
const Chat = ({
  auth,
  chat: { chatMessages },
  chatRoom: { chatRoom, loading },
  getChatMessages,
  udpateChatMessages,
  location,
}) => {
  const [chatMessage, setChatMessage] = useState({
    text: "",
  });

  const { text } = chatMessage;

  useEffect(() => {
    socket = io.connect("/");
    chatRoom && getChatMessages(chatRoom._id);

    chatRoom && socket.emit("join", { room: chatRoom.name });

    socket.on("message", (msg) => {
      console.log(msg);
      udpateChatMessages(msg);
    });

    return () => {
      socket.disconnect();
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

  if (!auth.isAuthenticated) {
    return <Redirect to="/" />;
  }

  if (!chatRoom) {
    return <Redirect to="/chat/join" />;
  }
  return (
    <div>
      {chatMessages && (
        <div>
          <Messages messages={chatMessages} />
        </div>
      )}

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
})(Chat);
