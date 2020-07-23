import React from "react";
import { Link } from "react-router-dom";

const CommentBadge = ({
    leaderboard: { author, posts, marketplace, comments, points },
}) => {

    var commentsBadge = false;

    if (comments > 0) {
        commentsBadge = true;
    }

  return (
    <div class="item">
      <div class="content">
        <div class="description">
            {commentsBadge && (
              <div>
                <img src="./test.jpg" alt="Comment Badge" width="50" height="50"
                ></img>
              <span>
                  Top Commenter!
              </span>
              </div>
            )}

            {!commentsBadge && (
              <p>
                Comment at least 50 times to earn the Comment Badge!
              </p>
            )}
        </div>
      </div>
    </div>
  );
};

export default CommentBadge;
