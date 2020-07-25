import React, { useState, useEffect, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { createForumPost } from "../../actions/post";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getLoggedProfile } from "../../actions/profile";
import { selectForum } from "../../actions/forum";

const ForumPostForm = ({
  createForumPost,
  history,
  match,
  forum: { forum },
  profile: { profile },
  getLoggedProfile,
}) => {
  useEffect(() => {
    getLoggedProfile();
    selectForum(match.params.forum_id);
  }, []);

  const [formData, setFormData] = useState({
    title: "",
    text: "",
    tag: "Default",
  });

  const { title, text, tag } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    createForumPost(match.params.forum_id, formData, history);
  };

  const isSenior = () => {
    return profile.completedModules.some((mod) => mod.title === forum.title);
  };

  const SeniorTags = () => {
    return (
      <Fragment>
        <label>
          Only for seniors:
          <select value={tag} onChange={onChange} name="tag">
            <option value="Default">Default</option>
            <option value="Review">Review</option>
            <option value="Advice">Advice</option>
          </select>
        </label>
      </Fragment>
    );
  };

  const JuniorTags = () => {
    return (
      <Fragment>
        <label>
          Tags:
          <p></p>
          <select value={tag} onChange={onChange} name="tag">
            <option value="Default">Default</option>
            <option value="Lecture">Lecture</option>
            <option value="Tutorial">Tutorial</option>
            <option value="Assignment">Assignment</option>
            <option value="Problem Set">Problem Set</option>
            <option value="Admin">Admin</option>
          </select>
        </label>
      </Fragment>
    );
  };

  return (
    profile &&
    forum && (
      <div style={{ marginTop: "70px" }} className={"ui fluid raised card"}>
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

          <p></p>
          {isSenior() ? <SeniorTags /> : <JuniorTags />}
          <p></p>
          <button class="ui button" type="submit">
            Submit
          </button>
        </form>
      </div>
    )
  );
};

ForumPostForm.propTypes = {
  creatForumPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  forum: state.forum,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  createForumPost,
  getLoggedProfile,
  selectForum,
})(withRouter(ForumPostForm));
