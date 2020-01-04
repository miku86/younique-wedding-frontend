import { CircularProgress, makeStyles, Theme } from "@material-ui/core";
import React from "react";

interface Props {}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}));

const LoadingSpinner: React.FC<Props> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  );
};

export default LoadingSpinner;
