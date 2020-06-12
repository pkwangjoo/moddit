import React, { Fragment } from "react";

import { connect } from "react-redux";
import ChatItem from "./ChatItem";

const ChatList = ({ chatRoom: { chatRooms } }) => {
  return (
    <Fragment>
      {chatRooms.map((room) => {
        return <ChatItem chatRoom={room} />;
      })}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  chatRoom: state.chatRoom,
});

export default connect(mapStateToProps)(ChatList);
