import React from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { useAppContext } from "../../utils/context";

interface Props {
  path: string;
  exact: boolean;
}

const AuthRoute: React.FC<Props> = ({ children, ...rest }) => {
  const { isAuthenticated } = useAppContext();
  const { pathname, search } = useLocation();

  return (
    <Route {...rest}>
      {isAuthenticated ? (
        children
      ) : (
        <Redirect to={`/login?redirect=${pathname}${search}`} />
      )}
    </Route>
  );
};

export default AuthRoute;
