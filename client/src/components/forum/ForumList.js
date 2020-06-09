import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getForums } from "../../actions/forum";
import { Link } from "react-router-dom";
import ForumItem from "./ForumItem";
import ForumForm from "./ForumForm";

const ForumList = ({ getForums, forum: { forums, loading } }) => {
  const [inputActive, setInputActive] = useState(false);
  useEffect(() => {
    getForums();
  }, [getForums]);

  const toggleInput = () => {
    console.log(inputActive);
    setInputActive(!inputActive);
  };

  return (
    <Fragment>
      <div class="ui fluid action input">
        <input type="text" placeholder="Search..." />
        <div class="ui button">Search</div>
      </div>
      <button
        onClick={toggleInput}
        style={{ padding: "5px" }}
        class="circular ui icon button"
      >
        <i class="plus icon"></i>
      </button>
      {inputActive && <ForumForm />}
      {!loading && (
        <Fragment>
          {forums.map((forum) => (
            <ForumItem forum={forum} />
          ))}
        </Fragment>
      )}
    </Fragment>
  );
};

ForumList.propTypes = {
  getForums: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  forum: state.forum,
});

export default connect(mapStateToProps, { getForums })(ForumList);
