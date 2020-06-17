import React, { Fragment } from "react";
import { Link } from "react-router-dom";
const ModuleItem = ({ module }) => {
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
        </div>
      </div>
    </Fragment>
  );
};

export default ModuleItem;
