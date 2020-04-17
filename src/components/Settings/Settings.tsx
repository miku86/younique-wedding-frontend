import { makeStyles, TextField, Theme } from "@material-ui/core";
import { API as AMPLIFY } from "aws-amplify";
import React, { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { config, API } from "../../config";
import { SettingsInputs } from "../../utils/customTypes";
import { useFormFields } from "../../utils/hooks";
import LoadingButton from "../shared/LoadingButton";
import { onError } from "../../utils/error";

interface Props {}

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

const Settings: React.FC<Props> = () => {
  const classes = useStyles();
  let history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldsChange] = useFormFields({
    availableBudget: 0,
  });
  const { t } = useTranslation();

  const validateForm = () => {
    return fields.availableBudget > 0;
  };

  const updateSettings = (data: SettingsInputs) => {
    setIsLoading(true);
    return AMPLIFY.put(config.API.NAME, API.SETTINGS, {
      body: { data },
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      await updateSettings(fields);
      history.push("/");
    } catch (error) {
      onError(error);
    }
    setIsLoading(false);
  };

  return (
    <div className={classes.root}>
      <div className={classes.card}>
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
            {t("save")}
          </LoadingButton>
        </form>
      </div>
    </div>
  );
};

export default Settings;
