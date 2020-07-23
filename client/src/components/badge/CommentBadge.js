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
                <img 
                src={require("../img/comment.png")}
                alt="Comment Badge"
                width="100"
                height="100"
                />
              <span>
                Top Commenter!
              </span>
              </div>
            )}

            {!commentsBadge && (
              <div>
              <img 
              src={require("../img/cross.png")}
              alt="No Badge"
              width="100"
              height="100"
              />
            <span>
             Comment 100 times to earn the Comment Badge!
            </span>
            </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default CommentBadge;
