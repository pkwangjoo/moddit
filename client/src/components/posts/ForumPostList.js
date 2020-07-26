import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getForumPosts,
  clearPosts,
  getPostsByTag,
  updatePosts,
} from "../../actions/post";
import { Link } from "react-router-dom";
import PostItem from "./PostItem";

const ForumPostList = ({
  forumID,
  getForumPosts,
  getPostsByTag,
  updatePosts,
  post: { posts, loading },
}) => {
  useEffect(() => {
    getForumPosts(forumID);

    return () => clearPosts();
  }, [getForumPosts, updatePosts]);

  const sortByLikes = () => {
    const sorted = [...posts].sort((a, b) => b.likes.length - a.likes.length);

    updatePosts(sorted);
  };

  const sortByComments = () => {
    const sorted = [...posts].sort(
      (a, b) => b.comments.length - a.comments.length
    );
    updatePosts(sorted);
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <div class="ui stackable menu">
        <a class=" item" onClick={() => getForumPosts(forumID)}>
          All Posts
        </a>
        <div class="ui simple dropdown item">
          Sort By <i class="dropdown icon"></i>
          <div class="menu">
            <a class="item" onClick={sortByLikes}>
              Most popular
            </a>
            <a class="item" onClick={sortByComments}>
              Most comments
            </a>
          </div>
        </div>

        <div class="right menu">
          <div class="ui simple dropdown item">
            View by Tags <i class="dropdown icon"></i>
            <div class="menu">
              <a class="item" onClick={() => getForumPosts(forumID)}>
                All
              </a>
              <a class="item" onClick={() => getPostsByTag("Lecture", forumID)}>
                Lecture
              </a>
              <a
                class="item"
                onClick={() => getPostsByTag("Tutorial", forumID)}
              >
                Tutorial
              </a>
              <a
                class="item"
                onClick={() => getPostsByTag("Assignment", forumID)}
              >
                Assignment
              </a>
              <a
                class="item"
                onClick={() => getPostsByTag("Problem Set", forumID)}
              >
                Problem Set
              </a>
              <a class="item" onClick={() => getPostsByTag("Admin", forumID)}>
                Admin
              </a>
              <a
                className="item"
                onClick={() => getPostsByTag("Review", forumID)}
              >
                Review
              </a>
              <a
                className="item"
                onClick={() => getPostsByTag("Advice", forumID)}
              >
                Advice
              </a>
            </div>
          </div>
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

export default connect(mapStateToProps, {
  getForumPosts,
  clearPosts,
  getPostsByTag,
  updatePosts,
})(ForumPostList);
