import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/user.actions";
import * as Routes from "./constants/routes";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";

function App({ setCurrentUser }) {
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
  }, []);
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path={Routes.HomePage} component={HomePage} />
        <Route path={Routes.ShopPage} component={ShopPage} />
        <Route path={Routes.SignInPage} component={SignInAndSignUpPage} />
      </Switch>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});
export default connect(null, mapDispatchToProps)(App);
