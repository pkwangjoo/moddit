import React, { useState, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { createForumMarketplace } from "../../actions/marketplace";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";

const ForumMarketplaceForm = ({ createForumMarketplace, history, match }) => {
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    tag: "default",
  });

  const forumID = match.params.forum_id;

  const [selectedFile, setFile] = useState(null);

  const { title, text, tag } = formData;

  const fileData = new FormData();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onFileChange = (e) => {
    setFile(e.target.files);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    for (var x = 0; x < selectedFile.length; x++) {
      fileData.append('file', selectedFile[x]);
    }
    fileData.append("text", text);
    fileData.append("title", title);
    fileData.append("tag", tag);

    createForumMarketplace(forumID, fileData, history);
  };

  const TagOptions = () => {
    return (
      <Fragment>
        <label>
          Tags:
          <p></p>
          <select value={tag} onChange={onChange} name="tag">
            <option value="Default">Default</option>
            <option value="Sample Exam Answers">Sample Exam Answers</option>
            <option value="Notes">Notes</option>
            <option value="Cheatsheets">Cheatsheets</option>
          </select>
        </label>
      </Fragment>
    );
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
        <div className="custom-file mb-4">
          <input
            type="file"
            className="custom-file-input"
            name="file"
            onChange={onFileChange}
            multiple
          />
          <label className="custom-file-label" htmlFor="customFile"></label>
        </div>
        <p></p>
        <TagOptions />
        <p></p>
        <button class="ui button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default connect(null, { createForumMarketplace })(
  withRouter(ForumMarketplaceForm)
);
