import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const PostItem = ({ post: { _id, text, title, author, date } }) => {
  return (
    <div class="ui centered card">
      <div class="content">
        <div class="header">{title} </div>
        <div class="meta">{author && author.name}</div>
        <div class="description">
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
};

export default connect(null)(PostItem);
