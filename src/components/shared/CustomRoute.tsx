import React, { Dispatch, SetStateAction } from "react";
import { Route } from "react-router-dom";

interface Props {
  path: string;
  exact: boolean;
  component: any;
  appProps: {
    isAuthenticated: boolean;
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  };
}

const CustomRoute: React.FC<Props> = ({ component: C, appProps, ...rest }) => {
  return <Route {...rest} render={props => <C {...props} {...appProps} />} />;
};

export default CustomRoute;
