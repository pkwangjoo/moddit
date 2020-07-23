import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const ModuleItem = ({ module, profile, auth }) => {
  const [completed, toggleCompleted] = useState(false);

  const completeModule = async () => {
    await axios.post(`/api/profile/modules/${module._id}/completed`);
    toggleCompleted(true);
  };

  /**
   * Checks whether the module has been completed or not
   */

  const moduleCompleted = () => {
    return profile.completedModules.some((mod) => mod._id === module._id);
  };
  return (
    <Fragment>
      <div class="ui fluid raised card">
        <div class="content">
          <div class="header">{module.title}</div>
          <div class="meta">{module.moduleCode}</div>
        </div>
        <div class="extra content">
          <Link
            to={`/forums/${module.forum._id}`}
            class="ui button basic primary"
          >
            Go to Forum
          </Link>

          {auth.user._id === profile.user._id && (
            <button
              onClick={completeModule}
              className={
                completed || moduleCompleted()
                  ? "ui disabled button"
                  : "ui basic primary button"
              }
            >
              Completed
            </button>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ModuleItem;
