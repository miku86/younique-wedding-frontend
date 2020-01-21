import { Link, makeStyles, Theme } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { API } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { config } from "../../config";
import budgetImage from "../../static/images/budget.jpg";
import guestsImage from "../../static/images/guests.jpg";
import todosImage from "../../static/images/todos.jpg";
import { TisAuthenticated } from "../../utils/customTypes";
import Landing from "../shared/Landing";
import LoadingSpinner from "../shared/LoadingSpinner";

interface Props {
  isAuthenticated: TisAuthenticated;
}

interface DashboardData {
  [key: string]: any;
}

const useStyles = makeStyles((theme: Theme) => ({
  dashboard: {
    padding: "0px 20px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    "& h1": {
      fontWeight: "600"
    },
    "& p": {
      color: "#666"
    },

    [theme.breakpoints.up("md")]: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
      justifyItems: "center",
      gridGap: "10px"
    }
  },
  card: {
    width: "100%",
    maxWidth: "360px",
    margin: "20px 0",

    "& a:hover": {
      textDecoration: "none"
    }
  },
  media: {
    height: 140
  }
}));

const Dashboard: React.FC<Props> = ({ isAuthenticated }) => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState<DashboardData>({});

  const fetchDashboardData = async () => {
    setIsLoading(true);
    const data = await API.get(config.API.NAME, "/dashboard", {});
    setDashboardData(data);
    setIsLoading(false);
  };

  useEffect(() => {
    (async () => {
      if (!isAuthenticated) {
        return;
      }

      try {
        fetchDashboardData();
      } catch (error) {
        alert(error);
      }
    })();
  }, [isAuthenticated]);

  const renderDashboard = () => {
    return (
      <div className={classes.dashboard}>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <Card className={classes.card}>
              <Link component={RouterLink} to="/todos">
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={todosImage}
                    title="Todos"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Todos
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      component="p"
                    >
                      {`${dashboardData?.todos?.amountDoneItems} /  ${dashboardData?.todos?.amountItems}`}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Done
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
            <Card className={classes.card}>
              <Link component={RouterLink} to="/guests">
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={guestsImage}
                    title="Guests"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Guests
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      component="p"
                    >
                      {`${dashboardData?.guests?.amountDoneItems} /  ${dashboardData?.guests?.amountItems}`}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Coming
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
            <Card className={classes.card}>
              <Link component={RouterLink} to="/budget">
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={budgetImage}
                    title="Budget"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Budget
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      component="p"
                    >
                      {`${dashboardData?.budget?.amountDoneItems} /  ${dashboardData?.budget?.amountItems}`}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Bought
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
          </>
        )}
      </div>
    );
  };

  return <div>{isAuthenticated ? renderDashboard() : <Landing />}</div>;
};

export default Dashboard;
