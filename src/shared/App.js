import React from "react";
import {Switch, Route} from "react-router-dom";
import routes from "./routes";
import Es6Promise from "es6-promise";

Es6Promise.polyfill();
const App = () => {
  return (
    <Switch>
      {routes.map((route, i) => <Route key={i} {...route} />)}
    </Switch>
  );
};

export default App;