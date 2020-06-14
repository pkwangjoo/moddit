import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getLoggedProfile } from "../../actions/profile";
import { Link } from "react-router-dom";
import { getListingsByUser, getListings } from "../../actions/listing";
import { getPostsByUser } from "../../actions/post";
import ListingListByUser from "../listing/ListingListByUser";
import PostListByUser from "../posts/PostListByUser";

const Dashboard = ({
  auth: { user },
  profile: { loading, profile },
  getLoggedProfile,
  getListingsByUser,
  getPostsByUser,
}) => {
  useEffect(() => {
    getLoggedProfile();
    profile !== null && getPostsByUser(profile.user._id);
    profile !== null && getListingsByUser(profile.user._id);
  }, [getPostsByUser, getListingsByUser, getLoggedProfile]);

  const [dashboardState, setDashboardState] = useState({
    posts: false,
    listings: false,
    marketplace: false,
  });

  const toggleListing = (e) => {
    setDashboardState({
      listings: true,
      posts: false,
    });
  };

  const togglePost = (e) => {
    setDashboardState({
      listings: false,
      posts: true,
    });
  };

  return !loading ? (
    <Fragment>
      <h1 className="ui center aligned header ">
        Welcome, {user && user.name}
      </h1>

      {profile !== null ? (
        <Fragment>
          <div role="list" class="ui list">
            <div role="listitem" class="item">
              <i aria-hidden="true" class="fas fa-university"></i>
              <div class="content">{profile.major}</div>
            </div>

            <div role="listitem" class="item">
              <i aria-hidden="true" class="mail icon"></i>
              <div class="content">
                <a href="">{user && user.email}</a>
              </div>
            </div>
          </div>
          <div class="ui grid">
            <div class="four wide column">
              <div class="ui vertical fluid tabular menu">
                <a class="item">Bio</a>
                <a onClick={togglePost} class="item">
                  Posts
                </a>
                <a onClick={toggleListing} class="item">
                  Listings
                </a>
              </div>
            </div>
            <div class="twelve wide stretched column">
              <div class="ui segment">
                {dashboardState.listings && (
                  <ListingListByUser userID={user._id} />
                )}
                {dashboardState.posts && <PostListByUser userID={user._id} />}
              </div>
            </div>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <Link to="/createprofile">Click here to make your profile!</Link>
        </Fragment>
      )}
    </Fragment>
  ) : (
    <div>loading</div>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  getLoggedProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, {
  getLoggedProfile,
  getPostsByUser,
  getListingsByUser,
})(Dashboard);
