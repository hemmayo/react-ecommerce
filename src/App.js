import React from "react";
import { Switch, Route } from "react-router-dom";
import * as Routes from "./constants/routes";

import HomePage from "./pages/homepage/homepage.component";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path={Routes.HomePage} component={HomePage} />
      </Switch>
      <HomePage />
    </div>
  );
}

export default App;
