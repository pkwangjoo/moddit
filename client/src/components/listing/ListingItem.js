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
  listing: { _id, author, title, text, date, limit, participants, tag },
}) => {
  const handleClick = (e) => {
    addParticipant(_id);
    history.push(`/listing/${_id}`);
  };

  const userInListing = () => {
    return participants.some(
      (participant) => participant._id === auth.user._id
    );
  };
  return (
    <div class="ui centered raised fluid card">
      <div class="content">
        {!auth.loading && auth.user._id === author._id && (
          <div class="right floated meta">
            <button
              onClick={() => deleteListing(_id)}
              class="mini ui red circular basic icon button"
            >
              <i class="trash alternate outline icon"></i>
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
        <a className="right floated">
          <i class="users icon"></i> {participants.length} / {limit} Members
        </a>
        {"  "}
        {participants.length < limit || userInListing() ? (
          <button onClick={handleClick} class="ui basic green button">
            Participate
          </button>
        ) : (
          <a class="ui red label">Full</a>
        )}
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
