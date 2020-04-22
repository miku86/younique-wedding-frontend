import { Card, CardContent, makeStyles, Theme, Typography } from "@material-ui/core";
import { CheckCircleOutline } from "@material-ui/icons";
import React from "react";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme: Theme) => ({
  summary: {
    display: "flex",
    flexDirection: "column",
    margin: "10px 0",

    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
      margin: "10px 0",
    },
  },
  card: {
    border: `1px solid ${theme.palette.primary.main}`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "10px 0",

    "& .MuiCardContent-root:last-child": {
      paddingBottom: "16px",
    },

    [theme.breakpoints.up("md")]: {
      width: "240px",
      margin: "20px 0",
    },
  },
  content: {
    display: "flex",
    flexDirection: "column",
  },
  text: {
    color: theme.palette.primary.main,
  },
}));

interface Props {
  amountItems: number;
  amountDoneItems: number;
}

const GuestsSummary = ({ amountItems, amountDoneItems }: Props) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.summary} data-testid="guests-summary">
      <Card className={classes.card}>
        <CheckCircleOutline style={{ fontSize: 32, color: "#e33371" }} />
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5" className={classes.text}>
            {`${amountDoneItems} /  ${amountItems}`}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {t("coming")}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

export default GuestsSummary
