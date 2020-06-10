import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const CommentReplyItem = ({ reply: { author, text, date, likes } }) => {
  return (
    <div class="comments">
      <div style={{ paddingLeft: "40px" }} class="comment">
        <div class="content">
          <a class="author">{author && author.name}</a>
          <div class="metadata">
            <span class="date">
              {" "}
              <Moment format="DD/MM/YY">{date}</Moment>
            </span>
          </div>
          <div class="text">{text}</div>
          <div class="actions"></div>
        </div>
      </div>
    </div>
  );
};

CommentReplyItem.propTypes = {
  reply: PropTypes.object.isRequired,
};

export default CommentReplyItem;
