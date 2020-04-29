import React from "react";
import { Route, Switch } from "react-router-dom";
import Budget from "../components/Budget";
import BudgetNew from "../components/BudgetNew";
import Dashboard from "../components/Dashboard";
import NewGuest from "../components/GuestNew";
import Guests from "../components/Guests";
import Login from "../components/Login/Login";
import NotFound from "../components/NotFound/NotFound";
import Settings from "../components/Settings/Settings";
import AuthRoute from "../components/shared/AuthRoute";
import CustomRoute from "../components/shared/CustomRoute";
import UnauthRoute from "../components/shared/UnauthRoute";
import Signup from "../components/Signup/Signup";
import TodoNew from "../components/TodoNew";
import Todos from "../components/Todos";
import { ROUTES } from "../config";

interface Props { }

const Routes: React.FC<Props> = () => {
  return (
    <Switch>
      <CustomRoute path="/" exact={true}>
        <Dashboard />
      </CustomRoute>
      <UnauthRoute path={ROUTES.LOGIN} exact={true}>
        <Login />
      </UnauthRoute>
      <UnauthRoute path={ROUTES.SIGNUP} exact={true}>
        <Signup />
      </UnauthRoute>
      <AuthRoute path={ROUTES.SETTINGS} exact={true}>
        <Settings />
      </AuthRoute>
      <AuthRoute path={ROUTES.TODOS} exact={true}>
        <Todos />
      </AuthRoute>
      <AuthRoute path={`${ROUTES.TODOSNEW}`} exact={true}>
        <TodoNew />
      </AuthRoute>
      <AuthRoute path={ROUTES.GUESTS} exact={true}>
        <Guests />
      </AuthRoute>
      <AuthRoute path={`${ROUTES.GUESTSNEW}`} exact={true}>
        <NewGuest />
      </AuthRoute>
      <AuthRoute path={ROUTES.BUDGET} exact={true}>
        <Budget />
      </AuthRoute>
      <AuthRoute path={`${ROUTES.BUDGETNEW}`} exact={true}>
        <BudgetNew />
      </AuthRoute>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
};

export default Routes;
