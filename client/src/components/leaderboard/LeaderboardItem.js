import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUserProfile } from "../../actions/profile";
import axios from "axios";

const LeaderboardItem = ({
  leaderboard: { author, posts, marketplace, comments, points },

  number,
}) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios.get(`/api/profile/${author._id}`).then((res) => setProfile(res.data));
  }, []);
  return (
    <div class="ui centered raised fluid card">
      <div class="content">
        <img class="right floated mini ui image" src={author.avatar}></img>
        <Link to={`/dashboard/${author._id}`} class="header">
          {number}. {author.name}
        </Link>
        <div class="meta">{profile && profile.major}</div>
        {console.log(profile)}
        <div class="description">
          <p>
            Posts: {posts}
            <br />
            Marketplace: {marketplace}
            <br />
            Comments: {comments}
            <br />
            Points: {points}
          </p>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { getUserProfile })(LeaderboardItem);
