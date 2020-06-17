import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getModule } from "../../actions/module";

const ModuleSearch = ({ getModule, module: { module, loading } }) => {
  const [modData, setModData] = useState({
    modCode: "",
  });

  const onChange = (e) =>
    setModData({ ...modData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    getModule(modData);
    setModData({
      modCode: "",
    });
  };

  const FoundModule = () => {
    return (
      <Fragment>
        <div class="ui fluid raised card">
          <div class="content">
            <div class="header">{module.title}</div>
            <div class="meta">{module.moduleCode}</div>
            <div class="description">
              <p>{module.description}</p>
            </div>
          </div>
          <div class="extra content">
            <Link
              to={`forums/${module.forum._id}`}
              class="ui button basic primary"
            >
              Go to Forum
            </Link>
          </div>
        </div>
      </Fragment>
    );
  };
  const ModuleNotFound = () => <div>Module is not found</div>;

  const { modCode } = modData;
  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        <div class="ui fluid icon input">
          <input
            type="text"
            name="modCode"
            value={modCode}
            onChange={onChange}
            placeholder="Search for a module"
          />
          <i type="submit" class="search icon"></i>
        </div>
      </form>
      {!loading && (module !== null ? <FoundModule /> : <ModuleNotFound />)}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  module: state.module,
});

export default connect(mapStateToProps, { getModule })(ModuleSearch);
