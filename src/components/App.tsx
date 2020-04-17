import { makeStyles, Theme } from "@material-ui/core";
import { Auth } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import budgetImage from "../static/images/budget.jpg";
import guestsImage from "../static/images/guests.jpg";
import dashboardImage from "../static/images/landing.jpg";
import todosImage from "../static/images/todos.jpg";
import Routes from "../utils/Routes";
import Feedbackbox from "./Feedback/Feedbackbox";
import Navbar from "./Navbar/Navbar";
import LoadingSpinner from "./shared/LoadingSpinner";
import ErrorBoundary from "./shared/ErrorBoundary";
import { onError } from "../utils/error";
import { AppContext } from "../utils/context";
import { ROUTE } from "../config";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flexGrow: 1,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    display: "flex",
    flexDirection: "column",
    padding: "0px 20px",

    "& h1": {
      fontWeight: "600",
    },
    "& p": {
      color: "#666",
    },
  },
}));

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState<boolean | null>(null);
  const classes = useStyles();
  let history = useHistory();

  useEffect(() => {
    (async () => {
      try {
        await Auth.currentSession();
        setIsAuthenticated(true);
      } catch (error) {
        onError(error);
      }
      setIsAuthenticating(false);
    })();
  }, []);

  const renderImage = (path: string) => {
    switch (path) {
      case "/":
        return dashboardImage;
      case ROUTE.TODOS:
        return todosImage;
      case ROUTE.GUESTS:
        return guestsImage;
      case "ROUTE.BUDGET":
        return budgetImage;
    }
  };

  return isAuthenticating ? (
    <LoadingSpinner />
  ) : (
    <ErrorBoundary>
      <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
        <div className={classes.root}>
          <Navbar />
          <div
            className={classes.content}
            style={{
              backgroundImage: `url(${renderImage(history.location.pathname)})`,
            }}
          >
            <Routes />
            {isAuthenticated && <Feedbackbox />}
          </div>
        </div>
      </AppContext.Provider>
    </ErrorBoundary>
  );
};

export default App;
