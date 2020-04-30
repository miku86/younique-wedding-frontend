import { makeStyles, TextField, Theme } from "@material-ui/core";
import React, { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { API, ROUTES } from "../../config";
import { createOne } from "../../utils/api/api";
import { BudgetItemInputs } from "../../utils/customTypes";
import { onError } from "../../utils/error";
import { isPropLongerThanZero } from "../../utils/helpers";
import { useFormFields } from "../../utils/hooks";
import LoadingButton from "../shared/LoadingButton";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: "60px 0",
    display: "flex",
    justifyContent: "center",
  },
  card: {
    borderRadius: "6px",
    backgroundColor: "#FFF",
    padding: "50px",
    boxShadow:
      "0 7px 14px 0 rgba(60,66,87, 0.2) , 0 3px 6px 0 rgba(0,0,0, 0.2)",
  },
  form: {
    display: "flex",
    flexDirection: "column",

    "& .MuiTextField-root": {
      marginBottom: theme.spacing(3),
      width: 200,
    },
  },
}));

interface Props { }

const BudgetNew: React.FC<Props> = () => {
  const classes = useStyles();
  let history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldsChange] = useFormFields({
    name: "",
    plannedCost: 0,
    actualCost: 0,
  });
  const { t } = useTranslation();

  const createItem = ({ name, plannedCost, actualCost }: BudgetItemInputs) => {
    return createOne(API.BUDGET, {
      name,
      plannedCost,
      actualCost,
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      await createItem(fields);
      history.push(ROUTES.BUDGET);
    } catch (error) {
      onError(error);
      setIsLoading(false);
    }
  };

  return (
    <div className={classes.root} data-testid="page-budget-new">
      <div className={classes.card}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <TextField
            label={t("name")}
            id="name"
            value={fields.name}
            onChange={handleFieldsChange}
            variant="outlined"
            fullWidth
            autoFocus
            required
            data-testid="budget-new-name"
          />
          <TextField
            label={t("plannedCost")}
            id="plannedCost"
            type="number"
            value={fields.plannedCost}
            onChange={handleFieldsChange}
            variant="outlined"
            fullWidth
            data-testid="budget-new-plannedcost"
          />
          <TextField
            label={t("actualCost")}
            id="actualCost"
            type="number"
            value={fields.actualCost}
            onChange={handleFieldsChange}
            variant="outlined"
            fullWidth
            data-testid="budget-new-actualcost"
          />
          <LoadingButton
            variant="contained"
            color="primary"
            fullWidth
            disabled={!isPropLongerThanZero(fields, "name")}
            isLoading={isLoading}
            type="submit"
            data-testid="budget-new-add"
          >
            {t("add")}
          </LoadingButton>
        </form>
      </div>
    </div>
  );
};

export default BudgetNew;
