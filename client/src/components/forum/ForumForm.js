import React, { useState } from "react";
import { connect } from "react-redux";
import { addForum } from "../../actions/forum";
import PropTypes from "prop-types";

const ForumForm = ({ addForum }) => {
  const [formData, setFormData] = useState({
    title: "",
  });

  const { title } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addForum(formData);
    setFormData({ title: "" });
  };
  return (
    <form onSubmit={onSubmit} class="ui reply form">
      <div class="field">
        <textarea
          name="title"
          value={title}
          onChange={onChange}
          rows="1"
        ></textarea>
      </div>
      <button class="ui primary submit labeled icon tiny button">
        <i class="icon edit"></i> Add Forum
      </button>
    </form>
  );
};

ForumForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addForum })(ForumForm);
