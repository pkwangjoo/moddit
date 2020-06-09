import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { selectForum } from "../../actions/forum";
import { clearPosts } from "../../actions/post";
import ForumPostList from "../posts/ForumPostList";
const Forum = ({
  selectForum,
  clearPosts,

  forum: { forum, loading },
  match,
}) => {
  useEffect(() => {
    selectForum(match.params.forum_id);
  }, [clearPosts, selectForum]);

  return (
    forum !== null &&
    !loading && (
      <Fragment>
        <div className="ui raised centered fluid card">
          <h2 style={{ padding: "30px" }} class="ui center aligned header">
            {forum.title}
          </h2>
          <div style={{ padding: "10px" }} class="ui secondary pointing menu">
            <a class="active item">Discussion</a>
            <a class="item">Marketplace</a>
            <a class="item">Listings</a>
          </div>
        </div>
        <ForumPostList forumID={forum._id} />
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
