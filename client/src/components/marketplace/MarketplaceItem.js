import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Moment from "react-moment";
import axios from "axios";
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
    var userExists = false;

    for (let i = 0; i < likes.length; i++) {
      if (likes[i].user === auth.user._id) {
        userExists = true;
        break;
      }
    }

    return userExists;
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
          </div>
          <div class="description">
            <p>{text}</p>
          </div>

          <br></br>

          <div class="ui vertical labeled icon buttons">
            <button class="ui button" onClick={downloadFile}>
              <i class={filename && fileType(filename)}></i>
              {filename}
            </button>
          </div>
        </div>

        <div class="extra content">
          <div className="ui right labeled button">
            <button
              onClick={() => likeMPost(_id)}
              type="button"
              className={userDidLike() ? "ui red button" : "ui button"}
            >
              {" "}
              <i aria-hidden="true" class="heart icon"></i>
              Like
            </button>
            <a class="ui left pointing basic label">{likes.length}</a>
          </div>
          <button className="ui button" onClick={() => unlikeMPost(_id)}>
            unlike
          </button>
          <div className="ui right labeled button">
            <Link to={`/marketplace/${_id}`} className="ui icon button">
              Discussions
            </Link>
            <a class="ui left pointing basic label">{comments.length}</a>
          </div>

          <Link to={`/dashboard/${author._id}`} class="right floated author">
            {author && author.name}
          </Link>
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
