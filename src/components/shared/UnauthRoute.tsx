import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAppContext } from "../../utils/context";

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
}

const UnauthRoute: React.FC<Props> = ({ children, ...rest }) => {
  const { isAuthenticated } = useAppContext();
  const redirect = querystring("redirect");

  return (
    <Route {...rest}>
      {!isAuthenticated ? (
        children
      ) : (
        <Redirect to={redirect === "" || redirect === null ? "/" : redirect} />
      )}
    </Route>
  );
};

export default UnauthRoute;
