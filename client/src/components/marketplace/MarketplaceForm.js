import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { createMarketplace } from "../../actions/marketplace";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";

const MarketplaceForm = ({ createMarketplace, history }) => {
    const [formData, setFormData] = useState({
        title: "",
        text: "",
    });

    const [selectedFile, setFile ] = useState(null);

    const { title, text } = formData;

    const fileData = new FormData();

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onFileChange = (e) => {
        setFile( e.target.files[0] );
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        fileData.append('text', text);
        fileData.append('title', title);
        fileData.append('file', selectedFile);

        createMarketplace(fileData, history);


    }

    return (
        <div style={{ marginTop: "70px" }} className="ui fluid raised card">
            <form style={{ padding: "10px"}} class="ui form" onSubmit={onSubmit}>
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
                    <input type='file' className="custom-file-input" name='file' onChange={onFileChange}/>
                    <label className="custom-file-label" htmlFor="customFile">
                    </label>
                </div>
                <button class="ui button" type="submit">
                    Submit
                </button>
            </form>
        </div>
    )

};


export default connect(null, { createMarketplace })(withRouter(MarketplaceForm))