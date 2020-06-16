import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Moment from "react-moment";
import { likePost, unlikePost, deletePost } from "../../actions/post";

const PostItem = ({
  auth,
  post: { _id, text, title, author, date, likes, comments },
  likePost,
  unlikePost,
  deletePost,
}) => {
  return (
    <div class="ui centered raised fluid card">
      <div class="content">
        {!auth.loading && auth.user._id === author._id && (
          <div class="right floated meta">
            <button
              onClick={() => deletePost(_id)}
              class="mini ui red basic button"
            >
              delete
            </button>
          </div>
        )}

        <div class="header">{title} </div>
        <div class="meta">
          <Moment format="DD/MM/YY">{date}</Moment>
        </div>
        <div class="description">
          <p>{text}</p>
        </div>
      </div>
      <div class="extra content">
        <div className="ui right labeled button">
          <button
            onClick={() => likePost(_id)}
            type="button"
            className="ui icon button"
          >
            {" "}
            <i aria-hidden="true" class="heart icon"></i>
            Like
          </button>
          <a class="ui left pointing basic label">{likes.length}</a>
        </div>
        <button className="ui button" onClick={() => unlikePost(_id)}>
          unlike
        </button>
        <div className="ui right labeled button">
          <Link to={`/posts/${_id}`} className="ui icon button">
            <i aria-hidden="true" class="heart icon"></i>
            Discussions
          </Link>
          <a class="ui left pointing basic label">{comments.length}</a>
        </div>
        <Link to={`/dashboard/${author._id}`} class="right floated author">
          {author && author.name}
        </Link>
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { likePost, unlikePost, deletePost })(
  PostItem
);
