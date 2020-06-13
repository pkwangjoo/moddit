import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import ListingItem from "./ListingItem";
import {
  selectListing,
  addChatRoom,
  addParticipant,
} from "../../actions/listing";
import ChatItem from "../chat/ChatItem";

const Listing = ({
  auth,
  addChatRoom,
  addParticipant,
  listing: { listings, listing, loading },
  match,
  selectListing,
}) => {
  useEffect(() => {
    selectListing(match.params.listing_id);
  }, [listings]);

  const onClick = (e) => {
    console.log("hi");

    addChatRoom(listing._id, {
      name: `Dedicated Chatroom for : ${listing.title}`,
    });
  };
  return (
    !loading &&
    listing !== null && (
      <Fragment>
        <ListingItem key={listing._id} listing={listing} />
        {!listing.chatRoom ? (
          <button onClick={onClick} class="circular ui icon button">
            Create ChatRoom <i class="plus icon"></i>
          </button>
        ) : (
          <ChatItem chatRoom={listing.chatRoom} />
        )}
        <br />
        <div class="ui large horizontal list">
          {listing.participants.map((participant) => {
            return (
              <div class="item">
                <img class="ui avatar image" src={participant.avatar} />
                <div class="content">
                  <div class="header">{participant.name}</div>
                  {participant._id === listing.author._id && "Admin"}
                </div>
              </div>
            );
          })}
        </div>
      </Fragment>
    )
  );
};

const mapStateToProps = (state) => ({
  listing: state.listing,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  selectListing,
  addChatRoom,
  addParticipant,
})(Listing);
