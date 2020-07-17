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
                <p>
                    Top Discussor!
                </p>
            )}
        </div>
      </div>
    </div>
  );
};

export default DiscussionBadge;
