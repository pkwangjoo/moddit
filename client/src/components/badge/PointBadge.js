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
                <div>
                <img 
                src={require("../img/contributor.png")}
                alt="Points Badge"
                width="100"
                height="100"
                />
              <span>
                Top Contributor!
              </span>
              </div>
            )}

            {!pointsBadge && (
               <div>
               <img 
               src={require("../img/cross.png")}
               alt="No Badge"
               width="100"
               height="100"
               />
             <span>
              Earn at least 500 points to earn the Point Badge!
             </span>
             </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default PointBadge;
