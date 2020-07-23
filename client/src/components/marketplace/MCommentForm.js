import React, { useState } from "react";
import { connect } from "react-redux";
import { addMComment } from "../../actions/marketplace";
import PropTypes from "prop-types";

const MCommentForm = ({ addMComment, marketplaceID }) => {
  const [formData, setFormData] = useState({
    text: "",
  });

  const { text } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addMComment(marketplaceID, formData);

    setFormData({ text: "" });
  };
  return (
    <form onSubmit={onSubmit} class="ui reply form">
      <div class="field">
        <textarea
          name="text"
          value={text}
          onChange={onChange}
          rows="1"
        ></textarea>
      </div>
      <button class="ui primary submit labeled icon tiny button">
        <i class="icon edit"></i> Add Comment
      </button>
    </form>
  );
};

export default connect(null, { addMComment })(MCommentForm);
