import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../actions/post";

const CommentItem = ({
  comment: {
    _id,
    author: { name, loading },
    text,
    date,
  },
}) => {
  return (
    <div class="ui fluid raised card">
      <div style={{ padding: "10px" }} class="comment">
        <div class="content">
          <a class="author">{name}</a>
          <div class="metadata">
            <span class="date">Today at 5:42PM</span>
          </div>
          <div class="text">{text}</div>
          <div class="actions">
            <a class="reply">Reply</a>
          </div>
        </div>
      </div>
    </div>
  );
};

CommentItem.propTypes = {};

export default CommentItem;
