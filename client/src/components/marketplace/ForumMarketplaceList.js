import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getForumMarketplaces,
  clearMPost,
  updateMPosts,
  getMarketplacesByTag,
} from "../../actions/marketplace";
import { Link } from "react-router-dom";
import MarketplaceItem from "./MarketplaceItem";

const ForumMarketplaceList = ({
  getForumMarketplaces,
  clearMPost,
  updateMPosts,
  getMarketplacesByTag,
  marketplace: { marketplaces, loading },
  forumID,
}) => {
  useEffect(() => {
    getForumMarketplaces(forumID);

    return () => clearMPost();
  }, [getForumMarketplaces]);

  const sortByLikes = () => {
    const sorted = [...marketplaces].sort(
      (a, b) => b.likes.length - a.likes.length
    );

    updateMPosts(sorted);
  };

  const sortByComments = () => {
    const sorted = [...marketplaces].sort(
      (a, b) => b.comments.length - a.comments.length
    );

    updateMPosts(sorted);
  };
  return (
    <div>
      <div class="ui menu">
        <a class=" item" onClick={() => getForumMarketplaces(forumID)}>
          All Marketplaces
        </a>
        <div class="ui simple dropdown item">
          Sort By <i class="dropdown icon"></i>
          <div class="menu">
            <a class="item" onClick={sortByLikes}>
              Most popular
            </a>
            <a class="item" onClick={sortByComments}>
              Most comments
            </a>
          </div>
        </div>

        <div class="right menu">
          <div class="ui simple dropdown item">
            View by Tags <i class="dropdown icon"></i>
            <div class="menu">
              <a class="item" onClick={() => getForumMarketplaces(forumID)}>
                All
              </a>
              <a
                class="item"
                onClick={() =>
                  getMarketplacesByTag("Sample Exam Answers", forumID)
                }
              >
                Sample Exam Answers
              </a>
              <a
                class="item"
                onClick={() => getMarketplacesByTag("Notes", forumID)}
              >
                Notes
              </a>
              <a
                class="item"
                onClick={() => getMarketplacesByTag("Cheatsheets", forumID)}
              >
                Cheatsheets
              </a>
            </div>
          </div>
          <div class="item">
            <Link to={`/forums/${forumID}/marketplaces/new`}>
              New Marketplace
            </Link>
          </div>
        </div>
      </div>
      {!loading && (
        <Fragment>
          {marketplaces.map((marketplace) => (
            <MarketplaceItem key={marketplace._id} marketplace={marketplace} />
          ))}
        </Fragment>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  marketplace: state.marketplace,
});

export default connect(mapStateToProps, {
  getForumMarketplaces,
  clearMPost,
  updateMPosts,
  getMarketplacesByTag,
})(ForumMarketplaceList);
