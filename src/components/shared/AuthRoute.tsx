import React, { ReactType } from "react";
import { Redirect, Route } from "react-router-dom";
import { IappProps } from "../../utils/customTypes";

interface Props {
  path: string;
  exact: boolean;
  component: ReactType;
  appProps: IappProps;
}

const AuthRoute: React.FC<Props> = ({ component: C, appProps, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        appProps.isAuthenticated ? (
          <C {...props} {...appProps} />
        ) : (
          <Redirect
            to={`/login?redirect=${props.location.pathname}${props.location.search}`}
          />
        )
      }
    />
  );
};

export default AuthRoute;
