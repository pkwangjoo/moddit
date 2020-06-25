import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { selectForum } from "../../actions/forum";
import { clearPosts } from "../../actions/post";
import ForumPostList from "../posts/ForumPostList";
import ListingList from "../listing/ListingList";
import ForumMarketplaceList from "../marketplace/ForumMarketplaceList";
const Forum = ({
  selectForum,
  clearPosts,

  forum: { forum, loading },
  match,
}) => {
  const [forumState, setForumState] = useState({
    posts: true,
    listings: false,
    marketplace: false,
  });
  useEffect(() => {
    selectForum(match.params.forum_id);
    return () => clearPosts();
  }, [selectForum]);

  const toggleListing = (e) => {
    setForumState({ posts: false, listings: true, marketplace: false });
  };

  const toggleDiscussion = (e) => {
    setForumState({ posts: true, listings: false, marketplace: false });
  };

  const toggleMarketplace = (e) => {
    setForumState({ posts: false, listings: false, marketplace: true });
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
            <a
              onClick={toggleMarketplace}
              className={forumState.marketplace ? "active item" : "item"}
            >
              Marketplace
            </a>
            <a
              class
              onClick={toggleListing}
              className={forumState.listings ? "active item" : "item"}
            >
              Listings
            </a>
          </div>
        </div>
        {forumState.posts && <ForumPostList forumID={match.params.forum_id} />}
        {forumState.listings && <ListingList forumID={match.params.forum_id} />}
        {forumState.marketplace && (
          <ForumMarketplaceList forumID={match.params.forum_id} />
        )}
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

export default connect(mapStateToProps, { selectForum, clearPosts })(Forum);
