import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Register = ({ register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    register({ name, email, password });
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <Fragment>
      <h1 className="ui orange header">Sign Up</h1>

      <form className="ui form" onSubmit={onSubmit}>
        <div className="field">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={onChange}
          />
        </div>
        <div className="field">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>

        <input type="submit" className="ui button" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register })(Register);
