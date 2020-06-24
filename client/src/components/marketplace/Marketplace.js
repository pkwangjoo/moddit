import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { selectMarketplace } from "../../actions/marketplace";
import MarketplaceItem from "./MarketplaceItem";

import MCommentList from "./MCommentList";
import MCommentForm from "./MCommentForm";

const Marketplace = ({
  selectMarketplace,
  marketplace: { marketplace, loading },
  match,
}) => {
  useEffect(() => {
    selectMarketplace(match.params.marketplace_id);
  }, [selectMarketplace]);

  return (
    marketplace !== null &&
    !loading && (
      <Fragment>
        <MarketplaceItem key={marketplace._id} marketplace={marketplace} />
        <div className="ui fluid container">
          <MCommentForm marketplaceID={marketplace._id} />
          <MCommentList />
        </div>
      </Fragment>
    )
  );
};

const mapStateToProps = (state) => ({
  marketplace: state.marketplace,
});

export default connect(mapStateToProps, { selectMarketplace })(Marketplace);
