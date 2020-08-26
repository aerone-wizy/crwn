import React from "react";
import { Route } from "react-router-dom";

import CollectionOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";
import CartSidebar from "../../components/cart-sidebar/cart-sidebar.component";

const ShopPage = ({ match }) => (
  <div className="shop-page">
    <div className="content">
      <Route exact path={`${match.path}`} component={CollectionOverview} />
      <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
    </div>
    <div className="sidebar">
      <CartSidebar />
    </div>
  </div>
);

export default ShopPage;
