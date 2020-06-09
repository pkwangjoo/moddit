import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { createForumPost } from "../../actions/post";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const ForumPostForm = ({ createForumPost, history, match }) => {
  const [formData, setFormData] = useState({
    title: "",
    text: "",
  });

  const { title, text } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    createForumPost(match.params.forum_id, formData, history);
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

ForumPostForm.propTypes = {
  creatForumPost: PropTypes.func.isRequired,
};

export default connect(null, { createForumPost })(withRouter(ForumPostForm));
