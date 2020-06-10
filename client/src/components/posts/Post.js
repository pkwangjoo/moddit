import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { selectPost } from "../../actions/post";
import PostItem from "./PostItem";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

const Post = ({ selectPost, post: { post, loading }, match }) => {
  useEffect(() => {
    selectPost(match.params.post_id);
  }, [selectPost]);

  return (
    post !== null &&
    !loading && (
      <Fragment>
        <PostItem key={post._id} post={post} />

        <div className="ui fluid container">
          <CommentForm postID={post._id} />
          <CommentList />
        </div>
      </Fragment>
    )
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});
export default connect(mapStateToProps, { selectPost })(Post);
