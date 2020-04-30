import { Link, makeStyles, Theme } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import { DashboardItem } from "../../../utils/customTypes";

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

interface Props {
  link: string;
  image: string;
  data: DashboardItem;
  title: string;
  text: string;
}

const DashboardCard = ({ link, image, data, title, text }: Props) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Card className={classes.card} data-testid="dashboard-card">
      <Link component={RouterLink} to={link}>
        <CardActionArea>
          <CardMedia className={classes.media} image={image} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {t(title)}
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              component="p"
            >
              {`${data.amountDoneItems} /  ${data.amountItems}`}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {t(text)}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};

export default DashboardCard;
