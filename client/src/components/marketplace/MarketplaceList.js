import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getMarketplaces } from "../../actions/marketplace";
import { Link } from "react-router-dom";
// import PostItem from "./PostItem";
import MarketplaceItem from "./MarketplaceItem";

const MarketplaceList = ({
  getMarketplaces,
  marketplace: { marketplaces, loading },
}) => {
  useEffect(() => {
    getMarketplaces();
  }, [getMarketplaces]);

  return (
    <div>
      <div class="ui pointing menu">
        <a class="active item">All Marketplaces</a>

        <div class="right menu">
          <div class="item">
            <Link to="/marketplace/new">New Marketplace</Link>
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

MarketplaceList.propTypes = {
  getMarketplaces: PropTypes.func.isRequired,
  marketplace: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  marketplace: state.marketplace,
});

export default connect(mapStateToProps, { getMarketplaces })(MarketplaceList);
