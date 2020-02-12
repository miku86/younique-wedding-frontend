import { makeStyles, TextField, Theme } from "@material-ui/core";
import { API } from "aws-amplify";
import React, { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { config } from "../../config";
import { BudgetItemInputs } from "../../utils/customTypes";
import { useFormFields } from "../../utils/hooks";
import LoadingButton from "../shared/LoadingButton";

interface Props {}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: "60px 0",
    display: "flex",
    justifyContent: "center"
  },
  card: {
    borderRadius: "6px",
    backgroundColor: "#FFF",
    padding: "50px",
    boxShadow: "0 7px 14px 0 rgba(60,66,87, 0.2) , 0 3px 6px 0 rgba(0,0,0, 0.2)"
  },
  form: {
    display: "flex",
    flexDirection: "column",

    "& .MuiTextField-root": {
      marginBottom: theme.spacing(3),
      width: 200
    }
  }
}));

const NewBudgetItem: React.FC<Props> = () => {
  const classes = useStyles();
  let history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldsChange] = useFormFields({
    name: "",
    plannedCost: 0,
    actualCost: 0
  });
  const { t } = useTranslation();

  const validateForm = () => {
    return fields.name.length > 0;
  };

  const createBudgetItem = ({
    name,
    plannedCost,
    actualCost
  }: BudgetItemInputs) => {
    const body = {
      name,
      plannedCost,
      actualCost
    };

    return API.post(config.API.NAME, "/budget", { body });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      await createBudgetItem(fields);
      history.push("/budget");
    } catch (error) {
      alert(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className={classes.root}>
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
          />
          <TextField
            label={t("plannedCost")}
            id="plannedCost"
            type="number"
            value={fields.plannedCost}
            onChange={handleFieldsChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            label={t("actualCost")}
            id="actualCost"
            type="number"
            value={fields.actualCost}
            onChange={handleFieldsChange}
            variant="outlined"
            fullWidth
          />
          <LoadingButton
            variant="contained"
            color="primary"
            fullWidth
            disabled={!validateForm()}
            isLoading={isLoading}
            type="submit"
          >
            {t("add")}
          </LoadingButton>
        </form>
      </div>
    </div>
  );
};

export default NewBudgetItem;
