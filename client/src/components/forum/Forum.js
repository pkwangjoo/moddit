import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { selectForum } from "../../actions/forum";
import { clearPosts } from "../../actions/post";
import ForumPostList from "../posts/ForumPostList";
import ListingList from "../listing/ListingList";
const Forum = ({
  selectForum,
  clearPosts,

  forum: { forum, loading },
  match,
}) => {
  const [forumState, setForumState] = useState({
    posts: true,
    listings: false,
  });
  useEffect(() => {
    selectForum(match.params.forum_id);
  }, [clearPosts, selectForum]);

  const toggleListing = (e) => {
    setForumState({ posts: false, listings: true });
  };

  const toggleDiscussion = (e) => {
    setForumState({ posts: true, listings: false });
  };

  return (
    forum !== null &&
    !loading && (
      <Fragment>
        <div className="ui raised centered fluid card">
          <h2 style={{ padding: "30px" }} class="ui center aligned header">
            {forum.title}
          </h2>
          <div style={{ padding: "10px" }} class="ui secondary pointing menu">
            <a
              class
              onClick={toggleDiscussion}
              className={forumState.posts ? "active item" : "item"}
            >
              Discussion
            </a>
            <a class="item">Marketplace</a>
            <a
              class
              onClick={toggleListing}
              className={forumState.listings ? "active item" : "item"}
            >
              Listings
            </a>
          </div>
        </div>
        {forumState.posts && <ForumPostList forumID={forum._id} />}
        {forumState.listings && <ListingList forumID={forum._id} />}
      </Fragment>
    )
  );
};

Forum.propTypes = {
  forum: PropTypes.object.isRequired,
  selectForum: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  forum: state.forum,
});

export default connect(mapStateToProps, { selectForum })(Forum);
