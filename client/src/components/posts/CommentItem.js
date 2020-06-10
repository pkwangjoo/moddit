import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../actions/post";
import Moment from "react-moment";
import { likeComment, selectComment } from "../../actions/comment";
import CommentReplyForm from "./CommentReplyForm";
import CommentReplyItem from "./CommentReplyItem";

const CommentItem = ({
  selectComment,
  likeComment,
  comment: {
    _id,
    author: { name, loading },
    text,
    date,
    likes,
    replies,
  },
}) => {
  const [inputActive, setInputActive] = useState(false);

  const toggleInput = () => {
    setInputActive(!inputActive);
  };
  return (
    <Fragment>
      {/* <div class="ui fluid raised card"> */}
      <div className="ui comments">
        <div style={{ padding: "10px" }} class="comment">
          <div class="content">
            <a class="author">{name}</a>
            <div class="metadata">
              <span class="date">
                {" "}
                <Moment format="DD/MM/YY">{date}</Moment>
              </span>
              <div class="likes">
                <i class="heart icon"></i>
                {likes.length}
              </div>
            </div>
            <div class="text">{text}</div>
            <div className="actions">
              <button
                className="ui mini basic button"
                onClick={() => likeComment(_id)}
              >
                like{" "}
              </button>
              <button onClick={toggleInput} className="ui mini basic button">
                reply{" "}
              </button>
            </div>

            {inputActive && (
              <CommentReplyForm toggleInput={toggleInput} commentID={_id} />
            )}
          </div>
          {replies &&
            replies.map((reply) => <CommentReplyItem reply={reply} />)}
        </div>
      </div>

      {/* </div> */}
    </Fragment>
  );
};

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  likeComment: PropTypes.func.isRequired,
  selectComment: PropTypes.func.isRequired,
};

export default connect(null, { likeComment, selectComment })(CommentItem);
