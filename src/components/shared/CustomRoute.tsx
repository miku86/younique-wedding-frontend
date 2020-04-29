import React from "react";
import { Route } from "react-router-dom";

interface Props {
  path: string;
  exact: boolean;
}

const CustomRoute: React.FC<Props> = ({ children, ...rest }) => {
  return <Route {...rest}>{children}</Route>;
};

export default CustomRoute;
