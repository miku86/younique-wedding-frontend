import { makeStyles, Theme } from "@material-ui/core";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { API, ROUTES } from "../../config";
import budgetImage from "../../static/images/budget.jpg";
import guestsImage from "../../static/images/guests.jpg";
import todosImage from "../../static/images/todos.jpg";
import { useAppContext } from "../../utils/context";
import { DashboardData } from "../../utils/customTypes";
import { fetchAll } from "../../utils/store/dashboardSlice";
import Landing from "../shared/Landing";
import LoadingSpinner from "../shared/LoadingSpinner";
import DashboardCard from "./DashboardCard";

interface Props {
  data: DashboardData;
  fetchAll: any;
}

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

const Dashboard: React.FC<Props> = ({ data, fetchAll }) => {
  const classes = useStyles();
  const { isAuthenticated } = useAppContext();

  useEffect(() => {
    if (!isAuthenticated) return;
    fetchAll(API.DASHBOARD);
  }, [fetchAll, isAuthenticated]);

  // TODO: add state
  const isLoading = false;

  return !isAuthenticated ? (
    <Landing />
  ) : (
    <div className={classes.dashboard} data-testid="page-dashboard">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <DashboardCard
            link={ROUTES.TODOS}
            image={todosImage}
            data={data.todos || []}
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

const mapStateToProps = (state: any) => ({
  data: state.dashboard
});

const mapDispatchToProps = {
  fetchAll,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
