import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import * as Routes from "./constants/routes";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    let unsubscribeFromAuth = null;
    let unsubscribeFromUser = null;

    unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        unsubscribeFromUser = userRef.onSnapshot(snapShot => {
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
  });
  return (
    <div>
      <Header currentUser={currentUser} />
      <Switch>
        <Route exact path={Routes.HomePage} component={HomePage} />
        <Route path={Routes.ShopPage} component={ShopPage} />
        <Route path={Routes.SignInPage} component={SignInAndSignUpPage} />
      </Switch>
    </div>
  );
}

export default App;
