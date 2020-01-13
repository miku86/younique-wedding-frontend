import { makeStyles, Theme } from "@material-ui/core";
import React, { useState } from "react";
import { TisAuthenticated } from "../../utils/customTypes";
import Landing from "../shared/Landing";

interface Props {
  isAuthenticated: TisAuthenticated;
}

const useStyles = makeStyles((theme: Theme) => ({
  dashboard: {
    padding: "0px 20px",
    textAlign: "center",

    "& h1": {
      fontWeight: "600"
    },
    "& p": {
      color: "#666"
    }
  }
}));

const Dashboard: React.FC<Props> = ({ isAuthenticated }) => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);

  const renderDashboard = () => {
    return (
      <div className={classes.dashboard}>
        <h1>Your Dashboard</h1>
        {!isLoading && "Dashboard"}
      </div>
    );
  };

  return <div>{isAuthenticated ? renderDashboard() : <Landing />}</div>;
};

export default Dashboard;
