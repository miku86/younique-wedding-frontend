import React from "react";
import { Route, Switch } from "react-router-dom";
import BudgetItems from "../components/Budget/BudgetItems";
import NewBudgetItem from "../components/Budget/NewBudgetItem";
import Dashboard from "../components/Dashboard";
import Guests from "../components/Guests/Guests";
import NewGuest from "../components/Guests/NewGuest";
import Login from "../components/Login/Login";
import NotFound from "../components/NotFound/NotFound";
import Settings from "../components/Settings/Settings";
import AuthRoute from "../components/shared/AuthRoute";
import CustomRoute from "../components/shared/CustomRoute";
import UnauthRoute from "../components/shared/UnauthRoute";
import Signup from "../components/Signup/Signup";
import TodoNew from "../components/TodoNew/TodoNew";
import Todos from "../components/Todos";
import { ROUTE } from "../config";

interface Props { }

const Routes: React.FC<Props> = () => {
  return (
    <Switch>
      <CustomRoute path="/" exact={true}>
        <Dashboard />
      </CustomRoute>
      <UnauthRoute path={ROUTE.LOGIN} exact={true}>
        <Login />
      </UnauthRoute>
      <UnauthRoute path={ROUTE.SIGNUP} exact={true}>
        <Signup />
      </UnauthRoute>
      <AuthRoute path={ROUTE.SETTINGS} exact={true}>
        <Settings />
      </AuthRoute>
      <AuthRoute path={ROUTE.TODOS} exact={true}>
        <Todos />
      </AuthRoute>
      <AuthRoute path={`${ROUTE.TODOSNEW}`} exact={true}>
        <TodoNew />
      </AuthRoute>
      <AuthRoute path={ROUTE.GUESTS} exact={true}>
        <Guests />
      </AuthRoute>
      <AuthRoute path={`${ROUTE.GUESTSNEW}`} exact={true}>
        <NewGuest />
      </AuthRoute>
      <AuthRoute path={ROUTE.BUDGET} exact={true}>
        <BudgetItems />
      </AuthRoute>
      <AuthRoute path={`${ROUTE.BUDGETNEW}`} exact={true}>
        <NewBudgetItem />
      </AuthRoute>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
};

export default Routes;
