import { makeStyles, Theme } from "@material-ui/core";
import React from "react";

interface Props {}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: "100px",
    textAlign: "center"
  }
}));

const NotFound: React.FC<Props> = () => {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <h3>Sorry, page not found!</h3>
    </div>
  );
};

export default NotFound;
