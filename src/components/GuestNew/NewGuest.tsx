import { makeStyles, TextField, Theme } from "@material-ui/core";
import { API as AMPLIFY } from "aws-amplify";
import React, { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { config, API, ROUTE } from "../../config";
import { useFormFields } from "../../utils/hooks";
import LoadingButton from "../shared/LoadingButton";
import { onError } from "../../utils/error";

interface Props {}

interface GuestInputs {
  name: string;
  comment: string;
}

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

const NewGuest: React.FC<Props> = () => {
  const classes = useStyles();
  let history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldsChange] = useFormFields({
    name: "",
    comment: "",
  });
  const { t } = useTranslation();

  const validateForm = () => {
    return fields.name.length > 0;
  };

  const createGuest = ({ name, comment }: GuestInputs) => {
    const body = {
      name,
      comment,
    };

    return AMPLIFY.post(config.API.NAME, API.GUESTS, { body });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      await createGuest(fields);
      history.push(ROUTE.GUESTS);
    } catch (error) {
      onError(error);
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
            label={t("comment")}
            id="comment"
            value={fields.comment}
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

export default NewGuest;
