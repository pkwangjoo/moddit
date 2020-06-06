import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Moment from "react-moment";

const PostItem = ({
  post: { _id, text, title, author, date, likes, comments },
}) => {
  return (
    <div class="ui centered raised fluid card">
      <div class="content">
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
          <Link to={`/post/${_id}`} className="ui icon button">
            <i aria-hidden="true" class="heart icon"></i>
            Like
          </Link>
          <a class="ui left pointing basic label">{likes.length}</a>
        </div>
        <div className="ui right labeled button">
          <Link to={`/post/${_id}`} className="ui icon button">
            <i aria-hidden="true" class="heart icon"></i>
            Discussions
          </Link>
          <a class="ui left pointing basic label">{likes.length}</a>
        </div>
        <div class="right floated author">{author && author.name}</div>
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {})(PostItem);
