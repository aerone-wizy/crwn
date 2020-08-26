import React from "react";
import { connect } from "react-redux";

import { clearItemFromCart } from "../../redux/cart/cart.actions";
import "./cart-item.styles.scss";

const CartItem = ({ item, clearItem, cartItem }) => (
  <div className="cart-item">
    <img src={item.imageUrl} alt="item" />
    <div className="item-details">
      <span className="name">{item.name}</span>
      <span className="price">
        {item.quantity} x ${item.price}
      </span>
    </div>
    <div className="remove-button" onClick={() => clearItem(item)}>
      &#10005;
    </div>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  clearItem: (item) => {
    console.log(item);
    dispatch(clearItemFromCart(item));
  },
});

export default connect(null, mapDispatchToProps)(CartItem);
