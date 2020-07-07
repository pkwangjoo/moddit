import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { getLeaderboards } from "../../actions/leaderboard";
import LeaderboardItem from "./LeaderboardItem";

const LeaderboardList = ({ leaderboard: { leaderboards, loading }, getLeaderboards }) => {
  useEffect(() => {
    getLeaderboards();
  }, [getLeaderboards]);

  let x = 0;

  const numberIncrease = (y) => {
    let z = y + 1;
    x++;
    return z;
  } 

  return (
    !loading && (
      <Fragment>
        <div class="ui items">
          {leaderboards.map((leaderboard) => {
            return <LeaderboardItem key={leaderboard._id} leaderboard={leaderboard} number = {numberIncrease(x)} />;
          })}
        </div>
      </Fragment>
    )
  );
};

const mapStateToProps = (state) => ({
  leaderboard: state.leaderboard,
});

export default connect(mapStateToProps, { getLeaderboards })(LeaderboardList);
