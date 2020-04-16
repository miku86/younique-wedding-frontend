import { makeStyles, TextField, Theme } from "@material-ui/core";
import { Auth } from "aws-amplify";
import React, { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { TsetIsAuthenticated } from "../../utils/customTypes";
import { useFormFields } from "../../utils/hooks";
import LoadingButton from "../shared/LoadingButton";
import { onError } from "../../utils/error";

interface Props {
  setIsAuthenticated: TsetIsAuthenticated;
}

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
      width: 260
    }
  }
}));

const Signup: React.FC<Props> = ({ setIsAuthenticated }) => {
  const classes = useStyles();
  let history = useHistory();
  const [newUser, setNewUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldsChange] = useFormFields({
    email: "",
    password: "",
    confirmationCode: ""
  });
  const { t } = useTranslation();

  const validateForm = () => {
    return fields.email.length > 0 && fields.password.length >= 8;
  };

  const validateConfirmationForm = () => {
    return fields.confirmationCode > 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      const newUser = await Auth.signUp({
        username: fields.email,
        password: fields.password
      });
      setNewUser(newUser);
    } catch (error) {
      onError(error);
    }
    setIsLoading(false);
  };

  const handleConfirmationSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      await Auth.confirmSignUp(fields.email, fields.confirmationCode);
      await Auth.signIn(fields.email, fields.password);
      setIsAuthenticated(true);
      history.push("/");
    } catch (error) {
      onError(error);
      setIsLoading(false);
    }
  };

  const renderForm = () => {
    return (
      <form onSubmit={handleSubmit} className={classes.form}>
        <TextField
          label={t("email")}
          id="email"
          placeholder="max@mustermann.com"
          value={fields.email}
          onChange={handleFieldsChange}
          variant="outlined"
          fullWidth
          autoFocus
          required
        />
        <TextField
          label={t("passwordMin")}
          type="password"
          id="password"
          value={fields.password}
          onChange={handleFieldsChange}
          autoComplete="current-password"
          variant="outlined"
          fullWidth
          required
        />
        <LoadingButton
          variant="contained"
          color="primary"
          fullWidth
          disabled={!validateForm()}
          isLoading={isLoading}
          type="submit"
        >
          {t("signup")}
        </LoadingButton>
      </form>
    );
  };

  const renderConfirmationForm = () => {
    return (
      <form onSubmit={handleConfirmationSubmit} className={classes.form}>
        <TextField
          id="confirmationCode"
          value={fields.confirmationCode}
          onChange={handleFieldsChange}
          variant="outlined"
          fullWidth
          autoFocus
          required
        />
        <LoadingButton
          variant="contained"
          color="primary"
          fullWidth
          disabled={!validateConfirmationForm()}
          isLoading={isLoading}
          type="submit"
        >
          {t("verify")}
        </LoadingButton>
      </form>
    );
  };

  return (
    <div className={classes.root}>
      {newUser === null ? renderForm() : renderConfirmationForm()}
    </div>
  );
};

export default Signup;
