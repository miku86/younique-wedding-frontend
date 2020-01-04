import { makeStyles, Theme } from "@material-ui/core";
import React from "react";

interface Props {}

const useStyles = makeStyles((theme: Theme) => ({
  landing: {
    padding: "80px 0",
    textAlign: "center",

    "& h1": {
      fontWeight: "600"
    },

    "& p": {
      color: "#999"
    }
  }
}));

const Home: React.FC<Props> = () => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.landing}>
        <h1>Younique Wedding</h1>
        <p>Plan your Wedding the right way</p>
      </div>
    </div>
  );
};

export default Home;
