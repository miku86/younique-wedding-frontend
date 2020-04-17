import { makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme: Theme) => ({
  landing: {
    padding: "80px 0",
    textAlign: "center",

    "& h1": {
      fontWeight: "600",
    },

    "& p": {
      color: "#999",
    },
  },
}));

interface Props {}

const Landing: React.FC<Props> = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.landing}>
      <h1 data-testid="landing-title">{t("siteTitle")}</h1>
      <p data-testid="landing-pitch">{t("sitePitch")}</p>
    </div>
  );
};

export default Landing;
