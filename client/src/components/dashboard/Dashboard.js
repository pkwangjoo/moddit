import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserProfile, clearProfile } from "../../actions/profile";
import { Link, withRouter } from "react-router-dom";
import {
  getListingsByUser,
  getListings,
  clearListings,
} from "../../actions/listing";
import { getPostsByUser, clearPosts } from "../../actions/post";
import { getMarketplacesByUser } from "../../actions/marketplace";

import ListingListByUser from "../listing/ListingListByUser";
import PostListByUser from "../posts/PostListByUser";
import MListByUser from "../marketplace/MListByUser";
import { privateChat, getPrivateChat } from "../../actions/chatRoom";
import ChatList from "../chat/ChatList";
import ModuleItem from "../module/ModuleItem";

const Dashboard = ({
  auth: { user },
  profile: { loading, profile },
  chatRoom,
  getListingsByUser,
  getPostsByUser,
  getUserProfile,
  clearProfile,
  clearListings,
  clearPosts,
  privateChat,
  getPrivateChat,
  getMarketplacesByUser,
  match,
  history,
}) => {
  useEffect(() => {
    getUserProfile(match.params.user_id);
    getPostsByUser(match.params.user_id);
    getListingsByUser(match.params.user_id);
    getPrivateChat(match.params.user_id);
    getMarketplacesByUser(match.params.user_id);

    return () => {
      clearProfile();
      clearPosts();
      clearListings();
    };
  }, [
    getUserProfile,
    getPostsByUser,
    getListingsByUser,
    match.params.user_id,
    getPrivateChat,
    getMarketplacesByUser,
  ]);

  const [dashboardState, setDashboardState] = useState({
    posts: false,
    listings: false,
    marketplace: false,
    privateChat: false,
    modules: false,
  });

  const toggleListing = (e) => {
    setDashboardState({
      listings: true,
      posts: false,
      privateChat: false,
      modules: false,
      marketplace: false,
    });
  };

  const togglePost = (e) => {
    setDashboardState({
      listings: false,
      posts: true,
      privateChat: false,
      modules: false,
      marketplace: false,
    });
  };

  const togglePrivateChat = (e) => {
    setDashboardState({
      listings: false,
      posts: false,
      privateChat: true,
      modules: false,
      marketplace: false,
    });
  };

  const toggleModules = (e) => {
    setDashboardState({
      listings: false,
      posts: false,
      privateChat: false,
      modules: true,
      marketplace: false,
    });
  };

  const toggleMarketplace = (e) => {
    setDashboardState({
      listings: false,
      posts: false,
      privateChat: false,
      modules: false,
      marketplace: true,
    });
  };

  const startMessage = (e) => {
    const userData = {
      sender_id: user._id,
      receiver_id: profile.user._id,
    };

    privateChat(userData, history);
  };

  const NoProfile = () => {
    return user._id === match.params.user_id ? (
      <Fragment>
        <AuthHeader />
        <Link to="/createprofile">Click here to make your profile</Link>
      </Fragment>
    ) : (
      <div>This user has no profile</div>
    );
  };

  const HasProfile = () => {
    return user._id === match.params.user_id ? (
      <Fragment>
        <AuthHeader />
        <Body />
      </Fragment>
    ) : (
      <Fragment>
        <NormalHeader />
        <Body />
      </Fragment>
    );
  };

  const AuthHeader = () => (
    <h1 className="ui center aligned header ">Welcome, {user.name} </h1>
  );

  const NormalHeader = () => (
    <Fragment>
      <h1 className="ui center aligned header ">
        {profile.user.name}'s Profile
      </h1>
      <button onClick={startMessage} class="ui centered basic button">
        <i class="paper plane outline icon"></i> Message
      </button>
    </Fragment>
  );

  const Body = () => {
    return (
      <Fragment>
        <div role="list" class="ui list">
          <div role="listitem" class="item">
            <i aria-hidden="true" class="fas fa-university"></i>
            <div class="content">{profile.major}</div>
          </div>

          <div role="listitem" class="item">
            <i aria-hidden="true" class="mail icon"></i>
            <div class="content">
              <a href="">{profile.user.email}</a>
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
              {match.params.user_id === user._id && (
                <a onClick={togglePrivateChat} className="item">
                  Private Chats
                </a>
              )}
              <a onClick={toggleModules} class="item">
                Modules
              </a>
              <a onClick={toggleMarketplace} class="item">
                Marketplace
              </a>
            </div>
          </div>
          <div class="twelve wide stretched column">
            <div class="ui segment">
              {dashboardState.listings && (
                <ListingListByUser userID={match.params.user_id} />
              )}
              {dashboardState.posts && (
                <PostListByUser userID={match.params.user_id} />
              )}
              {dashboardState.privateChat &&
                match.params.user_id === user._id && <ChatList />}
              {dashboardState.modules && (
                <Fragment>
                  {profile.modules.map((module) => {
                    return <ModuleItem key={module._id} module={module} />;
                  })}
                </Fragment>
              )}
              {dashboardState.marketplace && (
                <MListByUser useID={match.params.user_id} />
              )}
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

  return (
    user && (
      <Fragment>{profile !== null ? <HasProfile /> : <NoProfile />}</Fragment>
    )
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
  chatRoom: state.chatRoom,
});
export default connect(mapStateToProps, {
  getPostsByUser,
  getListingsByUser,
  getUserProfile,
  clearProfile,
  privateChat,
  getPrivateChat,
  clearPosts,
  clearListings,
  getMarketplacesByUser,
})(withRouter(Dashboard));
