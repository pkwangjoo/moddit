import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { createListing } from "../../actions/listing";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const ListingForm = ({ createListing, history, match }) => {
  const [formData, setFormData] = useState({
    title: "",
    text: "",
  });

  const { title, text } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    createListing(match.params.forum_id, formData, history);
  };
  return (
    <div style={{ marginTop: "70px" }} className="ui fluid raised card">
      <form style={{ padding: "10px" }} class="ui form" onSubmit={onSubmit}>
        <div class="field">
          <label>Title</label>
          <textarea
            onChange={onChange}
            name="title"
            value={title}
            rows="2"
          ></textarea>
        </div>
        <div class="field">
          <label>Text</label>
          <textarea onChange={onChange} name="text" value={text}></textarea>
        </div>
        <button class="ui button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default connect(null, { createListing })(withRouter(ListingForm));
