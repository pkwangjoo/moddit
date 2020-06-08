import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts } from "../../actions/post";
import { Link } from "react-router-dom";
import PostItem from "./PostItem";

const PostList = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <div>
      <div class="ui pointing menu">
        <a class="active item">All Posts</a>

        <div class="right menu">
          <div class="item">
            <Link to="/posts/new">New Post</Link>
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

PostList.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(PostList);
