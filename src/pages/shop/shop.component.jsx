import React from "react";
import { Route } from "react-router-dom";
// import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import CollectionOverviewContainer from "../../components/collections-overview/collections-overview.container";
import CollectionPageContainer from "../collection/collection.container";
import CartSidebar from "../../components/cart-sidebar/cart-sidebar.component";

import { fetchCollectionStart } from "../../redux/shop/shop.actions";

// import { updateCollections } from "../../redux/shop/shop.actions";

class ShopPage extends React.Component {
  componentDidMount() {
    const { fetchCollectionStart } = this.props;
    fetchCollectionStart();
  }

  render() {
    const { match } = this.props;

    return (
      <div className="shop-page">
        <div className="content">
          <Route
            exact
            path={`${match.path}`}
            component={CollectionOverviewContainer}
          />
          <Route
            path={`${match.path}/:collectionId`}
            component={CollectionPageContainer}
          />
        </div>
        <div className="sidebar">
          <CartSidebar />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionStart: () => dispatch(fetchCollectionStart()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
