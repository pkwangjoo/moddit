import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";

const Login = ({ login, auth: { user, isAuthenticated } }) => {
  const [formData, setFormData] = useState({
    email: "pkj5257@gmail.com",
    password: "password",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated && user) {
    return <Redirect to={`/dashboard/${user._id}`} />;
  }
  return (
    <Fragment>
      <h1 className="ui orange header">Log in</h1>
      <form class="ui form" onSubmit={onSubmit}>
        <div class="field">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
          />
        </div>

        <div class="field">
          <label>password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <p className="my-1">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>

        <button class="ui button" type="submit">
          Submit
        </button>
      </form>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { login })(Login);
