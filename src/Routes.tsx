import React, { Dispatch, SetStateAction } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import NotFound from "./components/NotFound/NotFound";
import CustomRoute from "./components/shared/CustomRoute";

interface Props {
  appProps: {
    isAuthenticated: boolean;
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  };
}

const Routes: React.FC<Props> = ({ appProps }) => {
  return (
    <Switch>
      <CustomRoute path="/" exact={true} component={Home} appProps={appProps} />
      <CustomRoute
        path="/login"
        exact={true}
        component={Login}
        appProps={appProps}
      />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
