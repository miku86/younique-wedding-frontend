import { makeStyles, Theme } from "@material-ui/core";
import React, { useEffect } from "react";
import { API, ROUTES } from "../../config";
import budgetImage from "../../static/images/budget.jpg";
import guestsImage from "../../static/images/guests.jpg";
import todosImage from "../../static/images/todos.jpg";
import { useAppContext } from "../../utils/context";
import { onError } from "../../utils/error";
import { useApi } from "../../utils/hooks/useApi";
import Landing from "../shared/Landing";
import LoadingSpinner from "../shared/LoadingSpinner";
import DashboardCard from "./DashboardCard";

interface Props { }

const useStyles = makeStyles((theme: Theme) => ({
  dashboard: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    "& h1": {
      fontWeight: "600",
    },
    "& p": {
      color: "#666",
    },

    [theme.breakpoints.up("md")]: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
      justifyItems: "center",
      gridGap: "10px",
    },
  },
  card: {
    width: "100%",
    maxWidth: "360px",
    margin: "20px 0",

    "& a:hover": {
      textDecoration: "none",
    },
  },
  media: {
    height: 140,
  },
}));

const Dashboard: React.FC<Props> = () => {
  const classes = useStyles();
  const { isAuthenticated } = useAppContext();
  const [{ data, isLoading }, doFetch] = useApi(API.DASHBOARD, {});

  useEffect(() => {
    (async () => {
      if (!isAuthenticated) {
        return;
      }

      try {
        doFetch(API.DASHBOARD);
      } catch (error) {
        onError(error);
      }
    })();
  }, [doFetch, isAuthenticated]);

  return !isAuthenticated
    ? <Landing />
    : (
      <div className={classes.dashboard}>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
            <>
              <DashboardCard
                link={ROUTES.TODOS}
                image={todosImage}
                data={data?.todos || []}
                title="todos"
                text="done"
              />
              <DashboardCard
                link={ROUTES.GUESTS}
                image={guestsImage}
                data={data.guests || []}
                title="guests"
                text="coming"
              />
              <DashboardCard
                link={ROUTES.BUDGET}
                image={budgetImage}
                data={data.budget || []}
                title="budget"
                text="bought"
              />
            </>
          )}
      </div>
    );
};

export default Dashboard;
