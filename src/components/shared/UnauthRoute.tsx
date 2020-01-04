import React from "react";
import { Redirect, Route } from "react-router-dom";
import { IappProps } from "../../utils/customTypes";

interface Props {
  path: string;
  exact: boolean;
  component: any;
  appProps: IappProps;
}

const UnauthRoute: React.FC<Props> = ({ component: C, appProps, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        !appProps.isAuthenticated ? (
          <C {...props} {...appProps} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default UnauthRoute;
