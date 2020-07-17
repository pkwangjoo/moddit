import React from "react";
import { Link } from "react-router-dom";

const MarketplaceBadge = ({
    leaderboard: { author, posts, marketplace, comments, points },
}) => {

    var marketplaceBadge = false;

    if (marketplace > 0) {
        marketplaceBadge = true;
    }

  return (
    <div class="item">
      <div class="content">
        <div class="description">
            {marketplaceBadge && (
                <p>
                    Top Sharer!
                </p>
            )}
        </div>
      </div>
    </div>
  );
};

export default MarketplaceBadge;
