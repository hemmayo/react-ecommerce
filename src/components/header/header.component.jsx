import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";

import { auth } from "../../firebase/firebase.utils";
import * as Routes from "../../constants/routes";

import { ReactComponent as Logo } from "../../assets/crown.svg";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

import {
  HeaderContainer,
  LogoContainer,
  OptionDiv,
  OptionLink,
  OptionsContainer
} from "./header.styles";

const Header = ({ currentUser, hidden }) => (
  <HeaderContainer>
    <LogoContainer to={Routes.HomePage}>
      <Logo className="logo" />
    </LogoContainer>
    <OptionsContainer>
      <OptionLink to="shop">SHOP</OptionLink>
      <OptionLink to="contact">CONTACT</OptionLink>

      {currentUser ? (
        <OptionDiv onClick={() => auth.signOut()}>SIGN OUT</OptionDiv>
      ) : (
        <OptionLink to={Routes.SignInPage}>SIGN IN</OptionLink>
      )}

      <CartIcon />
    </OptionsContainer>
    {!hidden && <CartDropdown />}
  </HeaderContainer>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);
