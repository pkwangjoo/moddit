import React, { useState } from "react";
import { connect } from "react-redux";
import { addComment } from "../../actions/post";
import PropTypes from "prop-types";

const CommentForm = ({ addComment, postID }) => {
  const [formData, setFormData] = useState({
    text: "",
  });

  const { text } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addComment(postID, formData);
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

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
