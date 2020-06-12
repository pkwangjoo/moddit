import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  const anon = (
    <ul className="nav navbar-nav navbar-right">
      <li>
        <Link to="/register">
          Register <i className="fa fa-user-plus"></i>
        </Link>
      </li>
      <li>
        <Link to="/login">
          Log-in <i className="fa fa-user"></i>
        </Link>
      </li>
    </ul>
  );

  const loggedin = (
    <ul className="nav navbar-nav navbar-right">
      <li>
        <Link to="/posts">Posts</Link>
      </li>
      <li>
        <Link to="/dashboard">Signed in as {user && user.name}</Link>
      </li>
      <li>
        <a href="" onClick={logout}>
          Logout
        </a>
      </li>
    </ul>
  );
  return (
    <div>
      <nav className="navbar navbar-default">
        <div className="ui main container">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1"
              aria-expanded="false"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to="/">
              Moddit
            </Link>
            <ul class="nav navbar-nav">
              <li>
                <Link to="/forums">Forum</Link>
              </li>
              <li>
                <Link to="/chat/join">Chat</Link>
              </li>
            </ul>
          </div>

          <div
            className="collapse navbar-collapse"
            id="bs-example-navbar-collapse-1"
          >
            {!loading && (
              <Fragment>{isAuthenticated ? loggedin : anon}</Fragment>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
