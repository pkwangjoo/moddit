import React, { Fragment, useState } from "react";
import { link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile } from "../../actions/profile";

const CreateProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({
    major: "",
  });

  const { major } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history);
  };
  return (
    <Fragment>
      <h1 className="large text-primary">Create Profile</h1>

      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="major"
            className="form-control"
            name="major"
            value={major}
            onChange={onChange}
          />
        </div>

        <input type="submit" className="btn btn-primary" value="Create" />
      </form>
    </Fragment>
  );
};
CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
};
export default connect(null, { createProfile })(withRouter(CreateProfile));
