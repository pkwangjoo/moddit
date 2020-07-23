import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Moment from "react-moment";
import { likePost, unlikePost, deletePost } from "../../actions/post";

const PostItem = ({
  auth,
  post: { _id, text, title, author, date, likes, comments, tag },
  likePost,
  unlikePost,
  deletePost,
}) => {
  const userDidLike = () => {
    return likes.some((liker) => liker.user === auth.user._id);
  };

  const cardType = (tag) => {
    if (tag === "Review" || tag === "Advice")
      return "ui centered raised fluid orange card";
    return "ui centered raised fluid card";
  };

  return (
    <div class={cardType(tag)}>
      <div class="content">
        {!auth.loading && auth.user._id === author._id && (
          <div class="right floated meta">
            <button
              onClick={() => deletePost(_id)}
              class="mini ui red basic button"
            >
              -
            </button>
          </div>
        )}

        <div class="header">{title} </div>
        <div class="meta">
          <Moment format="DD/MM/YY">{date}</Moment>
          <span className="category">{tag}</span>
        </div>
        <div class="description">
          <p>{text}</p>
        </div>
      </div>
      <div class="extra content">
        <span style={{ paddingRight: "10px" }}>
          <i
            onClick={
              userDidLike() ? () => unlikePost(_id) : () => likePost(_id)
            }
            className={
              userDidLike() ? "heart red like icon" : "heard outline like icon"
            }
          ></i>{" "}
          {likes.length} likes
        </span>

        <span>
          <Link to={`/posts/${_id}`}>
            {"  "}
            <i aria-hidden="true" class="comment outline icon"></i>
            {comments.length} comments
          </Link>
        </span>

        <div className="right floated author">
          <img class="ui tiny avatar image" src={author.avatar} />
          <Link to={`/dashboard/${author._id}`}>{author && author.name}</Link>
        </div>
      </div>
      <p></p>
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
