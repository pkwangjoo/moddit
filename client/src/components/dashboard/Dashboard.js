import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getLoggedProfile } from "../../actions/profile";
import { Link } from "react-router-dom";

const Dashboard = ({
  auth: { user },
  profile: { loading, profile },
  getLoggedProfile,
}) => {
  useEffect(() => {
    getLoggedProfile();
  }, []);

  return !loading ? (
    <Fragment>
      <h1>Welcome, {user && user.name}</h1>

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
export default connect(mapStateToProps, { getLoggedProfile })(Dashboard);
