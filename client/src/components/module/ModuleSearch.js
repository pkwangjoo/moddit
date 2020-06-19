import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getModule } from "../../actions/module";
import { getLoggedProfile } from "../../actions/profile";
import axios from "axios";

const ModuleSearch = ({
  getModule,
  getLoggedProfile,
  module: { module, loading },
  profile: { profile },
}) => {
  const [modData, setModData] = useState({
    modCode: "",
  });

  const [addModuleClick, disableAddModuleClick] = useState(true);

  useEffect(() => {
    getLoggedProfile();
  }, []);

  const onChange = (e) =>
    setModData({ ...modData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    getModule(modData);
    setModData({
      modCode: "",
    });
  };

  const addModule = async () => {
    console.log("module added to profile");
    disableAddModuleClick(false);
    await axios.post(`/api/profile/modules/${module._id}`);
  };

  const addedModule = (module_id) => {
    const foundProfile = profile;
    var moduleExists = false;

    for (let i = 0; i < foundProfile.modules.length; i++) {
      if (foundProfile.modules[i]._id === module_id) {
        moduleExists = true;
        break;
      }
    }

    return moduleExists;
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

            {!addedModule(module._id) && addModuleClick ? (
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
      {!loading &&
        profile !== null &&
        (module !== null ? <FoundModule /> : <ModuleNotFound />)}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  module: state.module,
  profile: state.profile,
});

export default connect(mapStateToProps, { getModule, getLoggedProfile })(
  ModuleSearch
);
