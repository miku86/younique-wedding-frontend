import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import NotFound from "../components/NotFound/NotFound";
import CustomRoute from "../components/shared/CustomRoute";
import UnauthRoute from "../components/shared/UnauthRoute";
import Signup from "../components/Signup/Signup";
import { IappProps } from "./customTypes";

interface Props {
  appProps: IappProps;
}

const Routes: React.FC<Props> = ({ appProps }) => {
  return (
    <Switch>
      <CustomRoute path="/" exact={true} component={Home} appProps={appProps} />
      <UnauthRoute
        path="/login"
        exact={true}
        component={Login}
        appProps={appProps}
      />
      <UnauthRoute
        path="/signup"
        exact={true}
        component={Signup}
        appProps={appProps}
      />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
