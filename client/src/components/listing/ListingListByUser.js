import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { getListingsByUser } from "../../actions/listing";
import { Link } from "react-router-dom";
import ListingItem from "./ListingItem";

const ListingListByUser = ({
  listing: { listings, loading },
  userID,
  getListingsByUser,
}) => {
  useEffect(() => {
    getListingsByUser(userID);
  }, [getListingsByUser]);
  return (
    <Fragment>
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

export default connect(mapStateToProps, { getListingsByUser })(
  ListingListByUser
);
