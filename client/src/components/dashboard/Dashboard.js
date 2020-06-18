import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserProfile, clearProfile } from "../../actions/profile";
import { Link } from "react-router-dom";
import { getListingsByUser, getListings } from "../../actions/listing";
import { getPostsByUser, clearPosts } from "../../actions/post";
import ListingListByUser from "../listing/ListingListByUser";
import PostListByUser from "../posts/PostListByUser";

const Dashboard = ({
  auth: { user },
  profile: { loading, profile },
  getListingsByUser,
  getPostsByUser,
  getUserProfile,
  clearProfile,
  match,
}) => {
  useEffect(() => {
    getUserProfile(match.params.user_id);
    getPostsByUser(match.params.user_id);
    getListingsByUser(match.params.user_id);

    return () => clearProfile();
  }, [getUserProfile, getPostsByUser, getListingsByUser]);

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

  const createProfile = () => {
    return <Link to="/createprofile">Click here to make ur profile</Link>;
  };

  const noProfile = () => {
    return <div>This person has no profile</div>;
  };

  const AuthHeader = () => (
    <h1 className="ui center aligned header ">Welcome, {user.name} </h1>
  );

  const NormalHeader = () => (
    <h1 className="ui center aligned header ">{profile.name}'s Profile</h1>
  );

  const body = () => {
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
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

  return (
    user && (
      <Fragment>
        <div>
          {user._id === match.params.user_id ? (
            <AuthHeader />
          ) : profile === null ? (
            <div>this person has no profile</div>
          ) : (
            <NormalHeader />
          )}
        </div>
      </Fragment>
    )
  );
};

// return (
//   user && (
//     <Fragment>
//       <div>{console.log(user._id)}</div>
//       <div>{console.log(profile)}</div>
//       <div>{console.log(match.params.user_id)}</div>
//     </Fragment>
//   )
// );

//   return !loading && profile ? (
//     <Fragment>
//       {user._id === profile.user._id ? (
//         <h1 className="ui center aligned header ">
//           Welcome, {user && user.name}
//         </h1>
//       ) : (
//         <h1 className="ui center aligned header ">
//           {user && user.name}'s Profile
//         </h1>
//       )}
//       <Fragment>
//         <div role="list" class="ui list">
//           <div role="listitem" class="item">
//             <i aria-hidden="true" class="fas fa-university"></i>
//             <div class="content">{profile.major}</div>
//           </div>

//           <div role="listitem" class="item">
//             <i aria-hidden="true" class="mail icon"></i>
//             <div class="content">
//               <a href="">{profile.user.email}</a>
//             </div>
//           </div>
//         </div>
//         <div class="ui grid">
//           <div class="four wide column">
//             <div class="ui vertical fluid tabular menu">
//               <a class="item">Bio</a>
//               <a onClick={togglePost} class="item">
//                 Posts
//               </a>
//               <a onClick={toggleListing} class="item">
//                 Listings
//               </a>
//             </div>
//           </div>
//           <div class="twelve wide stretched column">
//             <div class="ui segment">
//               {dashboardState.listings && (
//                 <ListingListByUser userID={match.params.user_id} />
//               )}
//               {dashboardState.posts && (
//                 <PostListByUser userID={match.params.user_id} />
//               )}
//             </div>
//           </div>
//         </div>
//       </Fragment>
//     </Fragment>
//   ) : match.params.user_id === user._id ? (
//     <createProfile />
//   ) : (
//     <noProfile />
//   );
// };

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
  getPostsByUser,
  getListingsByUser,
  getUserProfile,
  clearProfile,
})(Dashboard);
