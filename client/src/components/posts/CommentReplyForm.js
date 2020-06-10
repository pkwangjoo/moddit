import React, { useState } from "react";
import { connect } from "react-redux";
import { addCommentReply } from "../../actions/comment";

import PropTypes from "prop-types";

const CommentReplyForm = ({ toggleInput, addCommentReply, commentID }) => {
  const [formData, setFormData] = useState({
    text: "",
  });

  const { text } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addCommentReply(commentID, formData);
    setFormData({ text: "" });
    toggleInput();
  };
  return (
    <form onSubmit={onSubmit} class="ui reply form">
      <div class="field">
        <textarea
          name="text"
          value={text}
          onChange={onChange}
          rows="50"
        ></textarea>
      </div>
      <button class="ui primary submit labeled icon tiny button">
        <i class="icon edit"></i> Reply Comment
      </button>
    </form>
  );
};

CommentReplyForm.propTypes = {
  comment: PropTypes.object.isRequired,
  addCommentReply: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  comment: state.comment,
});

export default connect(mapStateToProps, { addCommentReply })(CommentReplyForm);
