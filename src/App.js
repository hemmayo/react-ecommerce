import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCurrentUser } from "./redux/user/user.selectors";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/user.actions";
import * as Routes from "./constants/routes";

import Header from "./components/header/header.component";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import CheckoutPage from "./pages/checkout/checkout.component";

function App({ currentUser, setCurrentUser }) {
  useEffect(() => {
    let unsubscribeFromAuth = null;
    let unsubscribeFromUser = null;

    unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        unsubscribeFromUser = userRef.onSnapshot(snapShot => {
          console.log(snapShot);
          if (snapShot.exists) {
            setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
            });
          }
        });
      }
    });
    return () => {
      unsubscribeFromAuth();
      unsubscribeFromUser();
    };
  }, [setCurrentUser]);

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path={Routes.HomePage} component={HomePage} />
        <Route path={Routes.ShopPage} component={ShopPage} />
        <Route
          exact
          path={Routes.SignInPage}
          render={() =>
            currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
          }
        />
        <Route exact path="/checkout" component={CheckoutPage} />
      </Switch>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
