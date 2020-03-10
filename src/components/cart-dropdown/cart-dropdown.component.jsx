import React from "react";
import { withRouter } from "react-router-dom";
import * as Routes from "../../constants/routes";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { toggleCartHidden } from "../../redux/cart/cart.actions";

import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";

import "./cart-dropdown.styles.scss";
import CartDropdownStyles from "./cart-dropdown.styles";

const CartDropdown = ({ history, cartItems, dispatch }) => (
  <CartDropdownStyles.Container>
    <CartDropdownStyles.CartItems>
      {cartItems.length ? (
        cartItems.map(cartItem => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))
      ) : (
        <CartDropdownStyles.EmptyMessage>
          Your cart is empty
        </CartDropdownStyles.EmptyMessage>
      )}
    </CartDropdownStyles.CartItems>
    <CustomButton
      onClick={() => {
        history.push(Routes.CheckoutPage);
        dispatch(toggleCartHidden());
      }}
    >
      GO TO CHECKOUT
    </CustomButton>
  </CartDropdownStyles.Container>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems
});

export default withRouter(connect(mapStateToProps)(CartDropdown));
