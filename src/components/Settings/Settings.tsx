import { makeStyles, TextField, Theme } from "@material-ui/core";
import { API } from "aws-amplify";
import React, { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { config } from "../../config";
import { SettingsInputs } from "../../utils/customTypes";
import { useFormFields } from "../../utils/hooks";
import LoadingButton from "../shared/LoadingButton";

interface Props {}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: "60px 0",
    display: "flex",
    justifyContent: "center"
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

const Settings: React.FC<Props> = () => {
  const classes = useStyles();
  let history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldsChange] = useFormFields({
    availableBudget: 0
  });
  const { t } = useTranslation();

  const validateForm = () => {
    return fields.availableBudget > 0;
  };

  const createBudgetItem = ({ availableBudget }: SettingsInputs) => {
    const body = {
      availableBudget
    };

    return API.post(config.API.NAME, "/", { body });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      await createBudgetItem(fields);
      history.push("/");
    } catch (error) {
      alert(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <TextField
          label={t("availableBudget")}
          id="availableBudget"
          type="number"
          value={fields.availableBudget}
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
  );
};

export default Settings;
