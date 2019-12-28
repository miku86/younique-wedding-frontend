import React from "react";
import { Route } from "react-router-dom";
import { IappProps } from "../../customTypes";

interface Props {
  path: string;
  exact: boolean;
  component: any;
  appProps: IappProps;
}

const CustomRoute: React.FC<Props> = ({ component: C, appProps, ...rest }) => {
  return <Route {...rest} render={props => <C {...props} {...appProps} />} />;
};

export default CustomRoute;