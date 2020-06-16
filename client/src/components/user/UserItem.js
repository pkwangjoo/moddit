import React from "react";
import { Link } from "react-router-dom";

const UserItem = ({ user: { _id, name, avatar } }) => {
  return (
    <div class="item">
      <a class="ui tiny image">
        <img src={avatar} />
      </a>
      <div class="content">
        <Link to={`/dashboard/${_id}`} class="header">
          {name}
        </Link>
        <div class="description">
          <p>
            Stevie Feliciano is a <a>library scientist</a> living in New York
            City. She likes to spend her time reading, running, and writing.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserItem;
