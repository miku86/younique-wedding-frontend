import { makeStyles, Theme } from "@material-ui/core";
import { Auth } from "aws-amplify";
import React, { useEffect, useState } from "react";
import Routes from "../utils/Routes";
import Feedbackbox from "./Feedback/Feedbackbox";
import Navbar from "./Navbar/Navbar";
import LoadingSpinner from "./shared/LoadingSpinner";

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    display: "flex",
    flexDirection: "column",
    padding: "0px 20px",

    "& h1": {
      fontWeight: "600"
    },
    "& p": {
      color: "#666"
    }
  }
}));

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    (async () => {
      try {
        await Auth.currentSession();
        setIsAuthenticated(true);
      } catch (error) {
        console.log(error);
      }
      setIsAuthenticating(false);
    })();
  }, []);

  return isAuthenticating ? (
    <LoadingSpinner />
  ) : (
    <>
      <Navbar
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
      <div className={classes.content}>
        <Routes appProps={{ isAuthenticated, setIsAuthenticated }} />
        {isAuthenticated && <Feedbackbox />}
      </div>
    </>
  );
};

export default App;
