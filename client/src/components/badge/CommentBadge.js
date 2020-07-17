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
                <p>
                    Top Commenter!
                </p>
            )}
        </div>
      </div>
    </div>
  );
};

export default CommentBadge;
