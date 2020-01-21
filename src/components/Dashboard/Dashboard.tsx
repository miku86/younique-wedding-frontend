import { Link, makeStyles, Theme } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import guestsImage from "../../static/images/guests.jpg";
import todosImage from "../../static/images/todos.jpg";
import { TisAuthenticated } from "../../utils/customTypes";
import Landing from "../shared/Landing";
import LoadingSpinner from "../shared/LoadingSpinner";

interface Props {
  isAuthenticated: TisAuthenticated;
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
      gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
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
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Information about Todos
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
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Information about Guests
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
