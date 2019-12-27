import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import NotFound from "./components/NotFound/NotFound";

interface Props {}

const Routes: React.FC<Props> = () => {
  return (
    <Switch>
      <Route path="/" exact={true} component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
