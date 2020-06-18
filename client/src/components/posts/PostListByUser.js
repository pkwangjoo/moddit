import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPostsByUser, clearPosts } from "../../actions/post";
import { Link } from "react-router-dom";
import PostItem from "./PostItem";

const PostListByUser = ({
  userID,
  getPostsByUser,
  clearPosts,
  post: { posts, loading },
}) => {
  useEffect(() => {
    getPostsByUser(userID);

    return () => clearPosts();
  }, [getPostsByUser]);

  return (
    <Fragment>
      {" "}
      {!loading && (
        <div>
          {posts.map((post) => (
            <PostItem key={post._id} post={post} />
          ))}
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPostsByUser, clearPosts })(
  PostListByUser
);
