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

interface Props {}

const Routes: React.FC<Props> = () => {
  return (
    <Switch>
      <CustomRoute path="/" exact={true}>
        <Dashboard />
      </CustomRoute>
      <UnauthRoute path="/login" exact={true}>
        <Login />
      </UnauthRoute>
      <UnauthRoute path="/signup" exact={true}>
        <Signup />
      </UnauthRoute>
      <AuthRoute path="/settings" exact={true}>
        <Settings />
      </AuthRoute>
      <AuthRoute path="/todos" exact={true}>
        <Todos />
      </AuthRoute>
      <AuthRoute path="/todos/new" exact={true}>
        <NewTodo />
      </AuthRoute>
      <AuthRoute path="/guests" exact={true}>
        <Guests />
      </AuthRoute>
      <AuthRoute path="/guests/new" exact={true}>
        <NewGuest />
      </AuthRoute>
      <AuthRoute path="/budget" exact={true}>
        <BudgetItems />
      </AuthRoute>
      <AuthRoute path="/budget/new" exact={true}>
        <NewBudgetItem />
      </AuthRoute>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
};

export default Routes;
