import React from "react";
import { joinChatRoom } from "../../actions/chatRoom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const ChatItem = ({ chatRoom, joinChatRoom, history }) => {
  const onClick = () => {
    joinChatRoom(chatRoom._id, history);
  };
  return (
    <div class="ui fluid card">
      <div class="content">
        <div class="header">{chatRoom.name}</div>
        <div class="meta">2 days ago</div>
        <div class="description"></div>
      </div>
      <button className="ui button" onClick={onClick}>
        Join Room
      </button>
    </div>
  );
};

export default connect(null, { joinChatRoom })(withRouter(ChatItem));
