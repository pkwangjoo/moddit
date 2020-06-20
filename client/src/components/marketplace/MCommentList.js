import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getMComments } from "../../actions/comment";

import { Link } from "react-router-dom";
import CommentItem from "../posts/CommentItem";

const MCommentList = ({
  marketplace,
  getMComments,
  comment: { comments, loading },
}) => {
  useEffect(() => {
    getMComments(marketplace.marketplace._id);
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

export default connect(mapStateToProps, { getMComments })(MCommentList);
