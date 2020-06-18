import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getForumPosts, clearPosts } from "../../actions/post";
import { Link } from "react-router-dom";
import PostItem from "./PostItem";

const ForumPostList = ({
  forumID,
  getForumPosts,
  post: { posts, loading },
}) => {
  useEffect(() => {
    getForumPosts(forumID);
    return () => clearPosts();
  }, [getForumPosts]);

  return (
    <div>
      <div class="ui pointing menu">
        <a class="active item">All Posts</a>

        <div class="right menu">
          <div class="item">
            <Link to={`/forums/${forumID}/posts/new`}>New Post</Link>
          </div>
        </div>
      </div>
      {!loading && (
        <Fragment>
          <div>
            {posts.map((post) => (
              <PostItem key={post._id} post={post} />
            ))}
          </div>
        </Fragment>
      )}
    </div>
  );
};

ForumPostList.propTypes = {
  getForumPosts: PropTypes.func.isRequired,

  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getForumPosts, clearPosts })(
  ForumPostList
);
