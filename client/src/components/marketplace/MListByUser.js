import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import MarketplaceItem from "./MarketplaceItem";
import { getMarketplacesByUser } from "../../actions/marketplace";
const MListByUser = ({
  userID,
  getMarketplacesByUser,
  marketplace: { marketplaces, loading },
}) => {
  useEffect(() => {
    getMarketplacesByUser(userID);
  });
  return (
    <Fragment>
      {!loading && (
        <div>
          {marketplaces.map((marketplace) => {
            return (
              <MarketplaceItem
                key={marketplace._id}
                marketplace={marketplace}
              />
            );
          })}
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  marketplace: state.marketplace,
});

export default connect(mapStateToProps, { getMarketplacesByUser })(MListByUser);
