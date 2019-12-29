import React from "react";
import { Switch, Route } from "react-router-dom";
import * as Routes from "./constants/routes";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path={Routes.HomePage} component={HomePage} />
        <Route path={Routes.ShopPage} component={ShopPage} />
      </Switch>
    </div>
  );
}

export default App;
