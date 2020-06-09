import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const ForumItem = ({ forum: { _id, title } }) => {
  return (
    <div class="ui fluid centered raised card">
      <div
        style={{ padding: "40px" }}
        class="ui two column very relaxed stackable grid"
      >
        <div className="column">
          <div class="content">
            <div class="header">{title}</div>
            <div class="meta">
              <span class="category">Module</span>
            </div>
            <div class="description">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>
        <div className="middle aligned column">
          <Link className="ui big button" to={`forums/${_id}`}>
            <i class="signup icon"></i>
            Join
          </Link>
        </div>
      </div>
    </div>
  );
};

ForumItem.propTypes = {};

export default ForumItem;
