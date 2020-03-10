import React from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { toggleCartHidden } from "../../redux/cart/cart.actions";
import { selectCartItemsCount } from "../../redux/cart/cart.selectors";
import CartIconStyles from "./cart-icon.styles";

const { Container, ShoppingIcon, ItemCount } = CartIconStyles;

const CartIcon = ({ toggleCartHidden, itemCount }) => (
  <Container onClick={toggleCartHidden}>
    <ShoppingIcon></ShoppingIcon>
    <ItemCount>{itemCount}</ItemCount>
  </Container>
);

const mapStateToProps = createStructuredSelector({
  itemCount: selectCartItemsCount
});

const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
