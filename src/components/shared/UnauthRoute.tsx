import React from "react";
import { Redirect, Route } from "react-router-dom";
import { IappProps } from "../../utils/customTypes";

const querystring = (name: string, url: string = window.location.href) => {
  name = name.replace(/[[]]/g, "\\$&");
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`, "i");
  const results = regex.exec(url);

  if (!results) {
    return null;
  }

  if (!results[2]) {
    return "";
  }

  return decodeURIComponent(results[2].replace(/\+/g, ""));
};

interface Props {
  path: string;
  exact: boolean;
  component: any;
  appProps: IappProps;
}

const UnauthRoute: React.FC<Props> = ({ component: C, appProps, ...rest }) => {
  const redirect = querystring("redirect");

  return (
    <Route
      {...rest}
      render={props =>
        !appProps.isAuthenticated ? (
          <C {...props} {...appProps} />
        ) : (
          <Redirect
            to={redirect === "" || redirect === null ? "/" : redirect}
          />
        )
      }
    />
  );
};

export default UnauthRoute;
