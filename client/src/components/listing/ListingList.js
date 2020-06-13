import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { getListings } from "../../actions/listing";
import { Link } from "react-router-dom";
import ListingItem from "./ListingItem";

const ListingList = ({
  listing: { listings, loading },
  forumID,
  getListings,
}) => {
  useEffect(() => {
    getListings(forumID);
  }, [getListings]);
  return (
    <Fragment>
      <div class="ui pointing menu">
        <a class="active item">All Listings</a>

        <div class="right menu">
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

export default connect(mapStateToProps, { getListings })(ListingList);
