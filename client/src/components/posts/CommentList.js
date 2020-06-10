import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getComments } from "../../actions/comment";

import { Link } from "react-router-dom";
import CommentItem from "./CommentItem";

const CommentList = ({ post, getComments, comment: { comments, loading } }) => {
  useEffect(() => {
    getComments(post.post._id);
  }, [getComments]);
  return (
    comments.length !== 0 && (
      <div
        className="ui fluid card"
        style={{ padding: "10px", marginTop: "10px" }}
      >
        {" "}
        {!loading && (
          <Fragment>
            <div>
              {comments.map((comment) => (
                <CommentItem key={comment._id} comment={comment} />
              ))}
            </div>
          </Fragment>
        )}
      </div>
    )
  );
};

CommentList.propTypes = {
  comment: PropTypes.object.isRequired,
  getComments: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  comment: state.comment,
  post: state.post,
});

export default connect(mapStateToProps, { getComments })(CommentList);
