import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getMComments, clearComments } from "../../actions/comment";

import { Link } from "react-router-dom";
import CommentItem from "../posts/CommentItem";

const MCommentList = ({
  marketplace,
  getMComments,
  clearComments,
  comment: { comments, loading },
}) => {
  useEffect(() => {
    getMComments(marketplace.marketplace._id);

    return () => clearComments();
  }, [getMComments]);
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

const mapStateToProps = (state) => ({
  comment: state.comment,
  marketplace: state.marketplace,
});

export default connect(mapStateToProps, { getMComments, clearComments })(
  MCommentList
);
