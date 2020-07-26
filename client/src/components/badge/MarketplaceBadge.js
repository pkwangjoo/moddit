import React from "react";
import { Link } from "react-router-dom";

const MarketplaceBadge = ({
    leaderboard: { author, posts, marketplace, comments, points },
}) => {

    var marketplaceBadge = false;

    if (marketplace > 49) {
        marketplaceBadge = true;
    }

  return (
    <div class="item">
      <div class="content">
        <div class="description">
            {marketplaceBadge && (
                <div>
                <img 
                src={require("../img/sharer.png")}
                alt="Comment Badge"
                width="100"
                height="100"
                />
              <span>
                Top Sharer!
              </span>
              </div>
            )}

            {!marketplaceBadge && (
              <div>
              <img 
              src={require("../img/cross.png")}
              alt="No Badge"
              width="100"
              height="100"
              />
            <span>
            Share 50 marketplaces to earn the Marketplace badge!
            </span>
            </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default MarketplaceBadge;
