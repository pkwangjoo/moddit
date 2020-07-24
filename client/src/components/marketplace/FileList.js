import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Moment from "react-moment";
import axios from "axios";
import FileSaver from 'file-saver';

const FileList = ({
    file: { _id, file, filename }
}) => {

    const fileType = () => {
        console.log(filename, 'filename')
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

            case ".jpg" || ".png" || "jpeg":
                return "file image outline icon";

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
                FileSaver.saveAs(response.data, `${filename}`);
            })
            .then(() => {
                console.log("Download Complete");
            })
    };

    return (
        <button class="ui button" onClick={downloadFile}>
            <i class={fileType()}></i>
            {filename}
        </button>
    );
};

FileList.propTypes = {
    file: PropTypes.object.isRequired,
  };

export default connect(null)(FileList);