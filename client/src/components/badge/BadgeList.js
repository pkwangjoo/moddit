import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import DiscussionBadge from "./DiscussionBadge";
import CommentBadge from "./CommentBadge";
import PointBadge from "./PointBadge";
import MarketplaceBadge from "./MarketplaceBadge";
import { getLeaderboardsByUser } from "../../actions/leaderboard";

const BadgeList = ({
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
            <PointBadge
                key={leaderboard._id}
                leaderboard={leaderboard}
            />
            
            <DiscussionBadge
                key={leaderboard._id}
                leaderboard={leaderboard}
            />
            
            <MarketplaceBadge
                key={leaderboard._id}
                leaderboard={leaderboard}
            />
            
            <CommentBadge
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

export default connect(mapStateToProps, { getLeaderboardsByUser })(BadgeList);
