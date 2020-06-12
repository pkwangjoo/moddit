import React, { useEffect, useState, Fragment } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  createChatRoom,
  getChatRooms,
  joinChatRoom,
} from "../../actions/chatRoom";

import ChatList from "./ChatList";

const ChatRoomList = ({
  auth,
  createChatRoom,
  joinChatRoom,
  getChatRooms,
  history,
  chatRoom: { chatRoom, chatRooms, loading },
}) => {
  const [roomData, setRoomData] = useState({
    name: "",
  });

  const { name } = roomData;

  useEffect(() => {
    getChatRooms();
  }, [getChatRooms]);

  const onChange = (e) =>
    setRoomData({ ...roomData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createChatRoom(roomData, history);
  };

  if (!auth.isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <Fragment>
      <h1 className="heading">Chat Rooms</h1>
      <form onSubmit={onSubmit}>
        <div className="ui action input">
          <input
            placeholder="Room name"
            type="text"
            name="name"
            value={name}
            onChange={onChange}
          />
          <button className="ui button" type="submit">
            create
          </button>
        </div>
      </form>
      {!loading && <ChatList />}
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  chatRoom: state.chatRoom,
});
export default connect(mapStateToProps, {
  createChatRoom,
  getChatRooms,
  joinChatRoom,
})(withRouter(ChatRoomList));
