import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import LeaderboardItem from "./LeaderboardItem";
import { getLeaderboardsByUser } from "../../actions/leaderboard";

const LeaderboardByUser = ({
  userID,
  getLeaderboardsByUser,
  leaderboard: { leaderboard, loading },
}) => {
  useEffect(() => {
    getLeaderboardsByUser(userID);
  });
  return (
    <Fragment>
      {!loading && (
        <div>
              <LeaderboardItem
                key={leaderboard._id}
                leaderboard={leaderboard}
              />
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  leaderboard: state.leaderboard,
});

export default connect(mapStateToProps, { getLeaderboardsByUser })(LeaderboardByUser);
