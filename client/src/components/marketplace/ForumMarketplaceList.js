import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getForumMarketplaces, clearMPost } from "../../actions/marketplace";
import { Link } from "react-router-dom";
import MarketplaceItem from "./MarketplaceItem";

const ForumMarketplaceList = ({
  getForumMarketplaces,
  clearMPost,
  marketplace: { marketplaces, loading },
  forumID,
}) => {
  useEffect(() => {
    getForumMarketplaces(forumID);

    return () => clearMPost();
  }, [getForumMarketplaces]);
  return (
    <div>
      <div class="ui pointing menu">
        <a class="active item">All Marketplaces</a>

        <div class="right menu">
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

export default connect(mapStateToProps, { getForumMarketplaces, clearMPost })(
  ForumMarketplaceList
);
