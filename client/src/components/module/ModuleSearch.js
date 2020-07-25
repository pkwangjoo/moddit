import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getModule, clearModule } from "../../actions/module";
import { getLoggedProfile } from "../../actions/profile";
import axios from "axios";
import { clearMPost } from "../../actions/marketplace";

const ModuleSearch = ({
  getModule,
  getLoggedProfile,
  clearModule,
  module: { module, loading },
  profile: { profile },
}) => {
  const [modData, setModData] = useState({
    modCode: "",
  });

  const [addModuleClick, disableAddModuleClick] = useState(true);

  useEffect(() => {
    getLoggedProfile();

    return () => clearModule();
  }, []);

  const onChange = (e) =>
    setModData({ ...modData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    clearModule();
    getModule(modData);
    setModData({
      modCode: "",
    });
    clearModule();
  };

  const addModule = async () => {
    console.log("module added to profile");
    disableAddModuleClick(false);
    await axios.post(`/api/profile/modules/${module._id}`);
  };

  /**
   * To check whether the module has been completed
   */

  const hasCompleted = (module_id) => {
    return profile.completedModules.some((mod) => mod._id === module_id);
  };

  /**
   * To check whether the user is taking the module currently
   */

  const hasTaken = (module_id) => {
    return profile.modules.some((mod) => mod._id === module_id);
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

            {!(hasCompleted(module._id) || hasTaken(module._id)) &&
            addModuleClick ? (
              <button onClick={addModule} className="ui button basic primary">
                Add to modules
              </button>
            ) : (
              <button class="ui disabled button">Already added</button>
            )}
          </div>
        </div>
      </Fragment>
    );
  };
  const ModuleNotFound = () => <div>Module is not found</div>;

  const { modCode } = modData;
  return (
    <div style={{ marginTop: "15px" }}>
      <form className="ui fluid form" onSubmit={onSubmit}>
        {/* <div class="ui fluid icon input">
          <input
            type="text"
            name="modCode"
            value={modCode}
            onChange={onChange}
            placeholder="Search for a module"
          />
          <div class="ui pointing label">Please enter a value</div>
          <i type="submit" class="search icon"></i>
        </div> */}
        <div class="field">
          <input
            type="text"
            name="modCode"
            value={modCode}
            onChange={onChange}
            placeholder="Search for a module"
          />
          {modData.modCode === "" && (
            <div class="ui pointing label">
              Please enter the module code and press "Enter"
            </div>
          )}
        </div>
      </form>
      {!loading && profile !== null && module !== null && <FoundModule />}
    </div>
  );
};

const mapStateToProps = (state) => ({
  module: state.module,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getModule,
  getLoggedProfile,
  clearModule,
})(ModuleSearch);
