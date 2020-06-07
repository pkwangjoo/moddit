import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { selectPost } from "../../actions/post";
import PostItem from "./PostItem";
import CommentItem from "./CommentItem";

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
          {post.comments.map((comment) => {
            console.log("hello");
            return <CommentItem key={comment._id} comment={comment} />;
          })}
        </div>
      </Fragment>
    )
  );
};

Post.propTypes = {};

const mapStateToProps = (state) => ({
  post: state.post,
});
export default connect(mapStateToProps, { selectPost })(Post);
