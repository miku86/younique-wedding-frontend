import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";

interface Props {}

const Routes: React.FC<Props> = () => {
  return (
    <Switch>
      <Route path="/" exact={true} component={Home} />
    </Switch>
  );
};

export default Routes;
