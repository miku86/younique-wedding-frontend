import { Link, makeStyles, Theme } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import { API, ROUTE } from "../../config";
import budgetImage from "../../static/images/budget.jpg";
import guestsImage from "../../static/images/guests.jpg";
import todosImage from "../../static/images/todos.jpg";
import Landing from "../shared/Landing";
import LoadingSpinner from "../shared/LoadingSpinner";
import { onError } from "../../utils/error";
import { useAppContext } from "../../utils/context";
import { useApi } from "../../utils/hooks/useApi";

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
  const { t } = useTranslation();
  const [{ data, isLoading, isError }, doFetch] = useApi(API.DASHBOARD, {});

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

  const renderDashboard = () => {
    return (
      <div className={classes.dashboard}>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <Card className={classes.card}>
              <Link component={RouterLink} to={ROUTE.TODOS}>
                <CardActionArea>
                  <CardMedia className={classes.media} image={todosImage} />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {t("todos")}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      component="p"
                    >
                      {`${data?.todos?.amountDoneItems} /  ${data?.todos?.amountItems}`}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {t("done")}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
            <Card className={classes.card}>
              <Link component={RouterLink} to={ROUTE.GUESTS}>
                <CardActionArea>
                  <CardMedia className={classes.media} image={guestsImage} />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {t("guests")}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      component="p"
                    >
                      {`${data?.guests?.amountDoneItems} /  ${data?.guests?.amountItems}`}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {t("coming")}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
            <Card className={classes.card}>
              <Link component={RouterLink} to={ROUTE.BUDGET}>
                <CardActionArea>
                  <CardMedia className={classes.media} image={budgetImage} />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {t("budget")}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      component="p"
                    >
                      {`${data?.budget?.amountDoneItems} /  ${data?.budget?.amountItems}`}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {t("bought")}
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
