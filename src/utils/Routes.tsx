import React from "react";
import { Route, Switch } from "react-router-dom";
import BudgetItems from "../components/Budget/BudgetItems";
import NewBudgetItem from "../components/Budget/NewBudgetItem";
import Dashboard from "../components/Dashboard/Dashboard";
import Guests from "../components/Guests/Guests";
import NewGuest from "../components/Guests/NewGuest";
import Login from "../components/Login/Login";
import NotFound from "../components/NotFound/NotFound";
import Settings from "../components/Settings/Settings";
import AuthRoute from "../components/shared/AuthRoute";
import CustomRoute from "../components/shared/CustomRoute";
import UnauthRoute from "../components/shared/UnauthRoute";
import Signup from "../components/Signup/Signup";
import NewTodo from "../components/Todos/NewTodo";
import Todos from "../components/Todos/Todos";
import { IappProps } from "./customTypes";

interface Props {
  appProps: IappProps;
}

const Routes: React.FC<Props> = ({ appProps }) => {
  return (
    <Switch>
      <CustomRoute
        path="/"
        exact={true}
        component={Dashboard}
        appProps={appProps}
      />
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
      <AuthRoute
        path="/settings"
        exact={true}
        component={Settings}
        appProps={appProps}
      />
      <AuthRoute
        path="/todos"
        exact={true}
        component={Todos}
        appProps={appProps}
      />
      <AuthRoute
        path="/todos/new"
        exact={true}
        component={NewTodo}
        appProps={appProps}
      />
      <AuthRoute
        path="/guests"
        exact={true}
        component={Guests}
        appProps={appProps}
      />
      <AuthRoute
        path="/guests/new"
        exact={true}
        component={NewGuest}
        appProps={appProps}
      />
      <AuthRoute
        path="/budget"
        exact={true}
        component={BudgetItems}
        appProps={appProps}
      />
      <AuthRoute
        path="/budget/new"
        exact={true}
        component={NewBudgetItem}
        appProps={appProps}
      />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
