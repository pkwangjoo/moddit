import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Moment from "react-moment";
import axios from "axios";
import FileSaver from 'file-saver';
// import { likePost, unlikePost, deletePost } from "../../actions/post";

const MarketplaceItem = ({
    auth,
    marketplace: { _id, text, title, author, date, likes, file, filename },
    //   likePost,
    //   unlikePost,
    //   deletePost,
}) => {

    const fileType = () => {
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
    }

    const downloadFile = async () => {
        axios({
            method: "GET",
            url: `/api/marketplace/${file}/download`,
            responseType: "blob"
        })
            .then(response => {
                FileSaver.saveAs(response.data, `${file}`);
            })
            .then(() => {
                console.log("Download Complete");
            })
    };

    return auth && (
        <div class="ui centered raised fluid card">
            <div class="content">
                {!auth.loading && auth.user._id === author._id && (
                    <div class="right floated meta">
                        <button class="mini ui red basic button">delete</button>
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
                        <i class={fileType()}></i>
                        { filename }
                    </button>
                </div>

            </div>

            <div class="extra content">
                <div className="ui right labeled button">
                    <button className="ui icon button">
                        {" "}
                        <i aria-hidden="true" class="heart icon"></i>
                        Like
                    </button>
                    <a class="ui left pointing basic label">{likes.length}</a>
                </div>
                <button className="ui button">Unlike</button>
                <div className="ui right labeled button">
                    <Link to={`/marketplace/${_id}`} className="ui icon button">
                        Discussions
                    </Link>
                </div>
                {/* <div className="ui right labeled button">
                    <button className="ui basic primary button" onClick={downloadFile}>
                        Download
                    </button>
                </div> */}
                <div class="right floated author">{author && author.name}</div>
            </div>
        </div>
        //     <Fragment>

        //         <div>the title is {title}</div>
        // <div>the author is {author.name}</div>
        // <div>currently logged in is {auth.user.name}</div>
        //     </Fragment>



    );
};

MarketplaceItem.propTypes = {
    marketplace: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    // likePost: PropTypes.func.isRequired,
    // unlikePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,

});
export default connect(mapStateToProps/*, { likePost, unlikePost, deletePost }*/)(
    MarketplaceItem
);
