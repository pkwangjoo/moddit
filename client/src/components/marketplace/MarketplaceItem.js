import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Moment from "react-moment";
import axios from "axios";

import FileSaver from 'file-saver';
import FileList from './FileList';
// import { likePost, unlikePost, deletePost } from "../../actions/post";

const MarketplaceItem = ({
    auth,
    marketplace: { _id, text, title, author, date, likes, files /*, filename*/ },
    //   likePost,
    //   unlikePost,
    //   deletePost,

import FileSaver from "file-saver";
import { likeMPost, unlikeMPost, deleteMPost } from "../../actions/marketplace";

const MarketplaceItem = ({
  auth,
  marketplace: {
    _id,
    text,
    title,
    author,
    date,
    likes,
    file,
    filename,
    comments,
    tag,
  },
  likeMPost,
  unlikeMPost,
  deleteMPost,

}) => {
  const fileType = (filename) => {
    const type = filename.slice(-4);


    switch (type) {
      case ".pdf":
        return "file pdf outline icon";

      case "docx" || "docs":
        return "file word outline icon";

      case ".csv" || "xlsx" || ".xls":
        return "file excel outline icon";

      case ".ppt" || "pptx":
        return "file powerpoint outline icon";

      default:
        return "file outline icon";
    }
  };

  const downloadFile = async () => {
    axios({
      method: "GET",
      url: `/api/marketplace/${file}/download`,
      responseType: "blob",
    })
      .then((response) => {
        FileSaver.saveAs(response.data, `${file}`);
      })
      .then(() => {
        console.log("Download Complete");
      });
  };

  const userDidLike = () => {
    return likes.some((liker) => liker.user === auth.user._id);
  };

  return (
    auth && (
      <div class="ui centered raised fluid card">
        <div class="content">
          {!auth.loading && auth.user._id === author._id && (
            <div class="right floated meta">
              <button
                onClick={() => deleteMPost(_id)}
                class="mini ui red basic button"
              >
                delete
              </button>
            </div>
          )}

          <div class="header">{title}</div>
          <div class="meta">
            <Moment format="DD/MM/YY">{date}</Moment>
            <span className="category">{tag}</span>
          </div>
          <div class="description">
            <p>{text}</p>
          </div>

          <br></br>

          <div class="ui tiny vertical labeled icon buttons">
            <button class="ui button" onClick={downloadFile}>
              <i class={filename && fileType(filename)}></i>
              {filename}
            </button>
          </div>
        </div>


        <div class="extra content">
          <span style={{ paddingRight: "10px" }}>
            <i
              onClick={
                userDidLike() ? () => unlikeMPost(_id) : () => likeMPost(_id)
              }
              className={
                userDidLike()
                  ? "heart red like icon"
                  : "heard outline like icon"
              }
            ></i>{" "}
            {likes.length} likes
          </span>

          <span>
            <Link to={`/marketplace/${_id}`}>
              {"  "}
              <i aria-hidden="true" class="comment outline icon"></i>
              {comments.length} comments
            </Link>
          </span>

          <div className="right floated author">
            <img class="ui tiny avatar image" src={author.avatar} />
            <Link to={`/dashboard/${author._id}`}>{author && author.name}</Link>
          </div>
        </div>
      </div>
    )
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {
  likeMPost,
  unlikeMPost,
  deleteMPost,
})(MarketplaceItem);
