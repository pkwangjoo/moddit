import React from "react";
import { Link } from "react-router-dom";

const LeaderboardItem = ({ leaderboard: { author, posts, marketplace, comments, points }, number }) => {
  return (
    <div class="item">
      <a class="ui tiny image">
        <img src={author.avatar} />
      </a>
      <div class="content">
        {number}
        <Link to={`/dashboard/${author._id}`} class="header">
          {author.name}
        </Link>
        <div class="description">
          <p>
            Posts: { posts }
            <br/>
            Marketplace: {marketplace}
            <br/>
            Comments: {comments}
            <br/>
            Points: { points }
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardItem;
