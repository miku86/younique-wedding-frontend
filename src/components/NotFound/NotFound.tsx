import { makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { useLocation } from "react-router-dom";

interface Props { }

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: "100px",
    textAlign: "center",
  },
}));

const NotFound: React.FC<Props> = () => {
  const classes = useStyles();
  const location = useLocation();

  return (
    <div className={classes.root} data-testid="page-404">
      <h1>Sorry, there is no page with the address <pre>{location.pathname}</pre></h1>
    </div>
  );
};

export default NotFound;
