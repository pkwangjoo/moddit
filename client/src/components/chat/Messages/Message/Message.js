import React from "react";
import { connect } from "react-redux";

import "./Message.css";

const Message = ({ auth, message: { sender, text } }) => {
  return sender === auth.user._id || sender._id === auth.user._id ? (
    <div className="messageContainer justifyEnd">
      <p className="sentText pr-10">{sender.name}</p>
      <div className="messageBox backgroundOrange">
        {" "}
        <p className="messageText colorWhite">{text}</p>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
        <p className="messageText colorDark">{text}</p>
      </div>
      <p className="sentText pl-10 ">{sender.name}</p>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Message);
