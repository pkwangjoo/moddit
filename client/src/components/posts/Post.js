import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { selectPost } from "../../actions/post";
import PostItem from "./PostItem";

const Post = ({ selectPost, post: { post, loading }, match }) => {
  useEffect(() => {
    selectPost(match.params.post_id);
  }, [selectPost]);

  return post !== null && !loading && <PostItem key={post._id} post={post} />;
};

Post.propTypes = {};

const mapStateToProps = (state) => ({
  post: state.post,
});
export default connect(mapStateToProps, { selectPost })(Post);
