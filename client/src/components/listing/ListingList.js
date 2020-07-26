import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import {
  getListings,
  clearListings,
  updateListing,
  getListingByTag,
} from "../../actions/listing";
import { Link } from "react-router-dom";
import ListingItem from "./ListingItem";

const ListingList = ({
  listing: { listings, loading },
  forumID,
  getListings,
  clearListings,
  getListingByTag,
  updateListing,
}) => {
  useEffect(() => {
    getListings(forumID);

    return () => clearListings();
  }, [getListings]);

  return (
    <Fragment>
      <div class="ui stackable menu">
        <a class="item" onClick={() => getListings(forumID)}>
          All Listings
        </a>

        <div class="right menu">
          <div class="ui simple dropdown item">
            View by Tags <i class="dropdown icon"></i>
            <div class="menu">
              <a class="item" onClick={() => getListings(forumID)}>
                All
              </a>
              <a
                class="item"
                onClick={() => getListingByTag("Consultation", forumID)}
              >
                Consultation
              </a>
              <a
                class="item"
                onClick={() => getListingByTag("Meet-up", forumID)}
              >
                Meet-up
              </a>
              <a
                class="item"
                onClick={() => getListingByTag("Study Session", forumID)}
              >
                Study Session
              </a>
            </div>
          </div>
          <div class="item">
            <Link to={`/forums/${forumID}/listings/new`}>New Listing</Link>
          </div>
        </div>
      </div>

      {!loading &&
        listings.map((listing) => {
          return <ListingItem key={listing._id} listing={listing} />;
        })}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  listing: state.listing,
});

export default connect(mapStateToProps, {
  getListings,
  clearListings,
  updateListing,
  getListingByTag,
})(ListingList);
