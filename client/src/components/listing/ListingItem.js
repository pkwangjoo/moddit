import React from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteListing, addParticipant } from "../../actions/listing";
import { Redirect, NavLink, withRouter } from "react-router-dom";

const ListingItem = ({
  history,
  addParticipant,
  deleteListing,
  auth,
  listing: { _id, author, title, text, date },
}) => {
  const handleClick = (e) => {
    addParticipant(_id);
    history.push(`/listing/${_id}`);
  };
  return (
    <div class="ui centered raised fluid card">
      <div class="content">
        {!auth.loading && auth.user._id === author._id && (
          <div class="right floated meta">
            <button
              onClick={(e) => deleteListing(_id)}
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
        <button onClick={handleClick} class="ui basic green button">
          Participate
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteListing, addParticipant })(
  withRouter(ListingItem)
);
