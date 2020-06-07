import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { createPost } from "../../actions/post";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const NewPost = ({ createPost, history }) => {
  const [formData, setFormData] = useState({
    title: "",
    text: "",
  });

  const { title, text } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("hi");
    createPost(formData, history);
  };
  return (
    <form class="ui form" onSubmit={onSubmit}>
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
  );
};

NewPost.propTypes = {
  createPost: PropTypes.func.isRequired,
};

export default connect(null, { createPost })(withRouter(NewPost));
