import React from "react";
import { Link } from "react-router-dom";

const DiscussionBadge = ({
    leaderboard: { author, posts, marketplace, comments, points },
}) => {

    var discussionBadge = false;

    if (posts > 0) {
        discussionBadge = true;
    }

  return (
    <div class="item">
      <div class="content">
        <div class="description">
            {discussionBadge && (
                <div>
                <img 
                src={require("../img/discussor.png")}
                alt="Discussion Badge"
                width="100"
                height="100"
                />
              <span>
                Top Discussor!
              </span>
              </div>
            )}

            {!discussionBadge && (
                <div>
                <img 
                src={require("../img/cross.png")}
                alt="No Badge"
                width="100"
                height="100"
                />
              <span>
              Make 500 discussions to earn the Discussor Badge!
              </span>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default DiscussionBadge;
