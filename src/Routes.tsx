import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import NotFound from "./components/NotFound/NotFound";

interface Props {}

const Routes: React.FC<Props> = () => {
  return (
    <Switch>
      <Route path="/" exact={true} component={Home} />
      <Route path="/login" exact={true} component={Login} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
