import React from "react";
import { Link } from "react-router-dom";

const PointBadge = ({
    leaderboard: { author, posts, marketplace, comments, points },
}) => {

    var pointsBadge = false;

    if (points > 0) {
        pointsBadge = true;
    }

  return (
    <div class="item">
      <div class="content">
        <div class="description">
            {pointsBadge && (
                <p>
                    Top Contributor!
                </p>
            )}

            {!pointsBadge && (
              <p>
                Earn at least 500 points to earn the Points Badge!
              </p>
            )}
        </div>
      </div>
    </div>
  );
};

export default PointBadge;
