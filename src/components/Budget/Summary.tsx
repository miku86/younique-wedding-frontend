import { Box, Card, CardContent, makeStyles, Theme, Typography } from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { BudgetItem } from "../../utils/customTypes";

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
  data: BudgetItem[];
  availableBudget: number;
}

const Summary: React.FC<Props> = ({ data, availableBudget }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const formatter = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const actualCosts = data.reduce((total, currentItem) => {
    return total + Number(currentItem.actualCost);
  }, 0);

  return (
    <div className={classes.summary}>
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <Box textAlign="center">
            <Typography component="h5" variant="h5" className={classes.text}>
              {`${formatter.format(
                availableBudget - actualCosts
              )} /  ${formatter.format(availableBudget)}`}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {t("availableBudget")}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default Summary;
