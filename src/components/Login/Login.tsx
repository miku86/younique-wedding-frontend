import { Button, makeStyles, TextField, Theme } from "@material-ui/core";
import { Auth } from "aws-amplify";
import React, { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { demoUser } from "../../config";
import { useAppContext } from "../../utils/context";
import { onError } from "../../utils/error";
import { useFormFields } from "../../utils/hooks";
import LoadingButton from "../shared/LoadingButton";

interface Props { }

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: "60px 0",
    display: "flex",
    justifyContent: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",

    "& .MuiTextField-root": {
      marginBottom: theme.spacing(3),
      width: 260,
    },
  },
  demoButton: {
    marginTop: 100,
    color: "rgba(0, 0, 0, 0.5)",
  },
}));

const Login: React.FC<Props> = () => {
  const classes = useStyles();
  const { setIsAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldsChange] = useFormFields({
    email: "",
    password: "",
  });
  const { t } = useTranslation();

  const validateForm = () => {
    return fields.email.length > 0 && fields.password.length >= 8;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      await Auth.signIn(fields.email, fields.password);
      setIsAuthenticated!(true);
    } catch (error) {
      onError(error);
      setIsLoading(false);
    }
  };

  const handleUseDemo = async (event: any) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      await Auth.signIn(demoUser.email, demoUser.password);
      setIsAuthenticated!(true);
    } catch (error) {
      onError(error);
      setIsLoading(false);
    }
  };

  return (
    <div className={classes.root} data-testid="page-login">
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
          label={t("password")}
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
          data-testid="login-submit"
        >
          {t("login")}
        </LoadingButton>

        <Button
          variant="outlined"
          fullWidth
          onClick={handleUseDemo}
          className={classes.demoButton}
          data-testid="demo-account"
        >
          {t("useDemoAccount")}
        </Button>
      </form>
    </div>
  );
};

export default Login;
