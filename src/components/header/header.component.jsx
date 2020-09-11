import React from "react";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { useLocation } from "react-router-dom";

// import { signOutStart } from "../../firebase/firebase.utils";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { selectCartHidden } from "../../redux/cart/cart.selector";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { signOutStart } from "../../redux/user/user.actions";

import { ReactComponent as Logo } from "../../assets/crown.svg";

import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink,
} from "./header.styles";

const Header = ({ currentUser, hidden, signOutStart }) => {
  let location = useLocation();
  return (
    <HeaderContainer>
      <LogoContainer to="/">
        <Logo className="logo" />
      </LogoContainer>
      <OptionsContainer>
        <OptionLink to="/shop">SHOP</OptionLink>
        <OptionLink to="/shop">CONTACT</OptionLink>
        <OptionLink to="/admin">ADMIN</OptionLink>
        {currentUser ? (
          <OptionLink as="div" onClick={signOutStart}>
            SIGN OUT
          </OptionLink>
        ) : (
          <OptionLink className="option" to="/signin">
            SIGN IN
          </OptionLink>
        )}
        {location.pathname.includes("shop") ? null : <CartIcon />}
      </OptionsContainer>
      {hidden || location.pathname.includes("shop") ? null : <CartDropdown />}
    </HeaderContainer>
  );
};

const mapStateToProps = () =>
  createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden,
  });

const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
