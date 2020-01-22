import { makeStyles, TextField, Theme } from "@material-ui/core";
import { Auth } from "aws-amplify";
import React, { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { TsetIsAuthenticated } from "../../utils/customTypes";
import { useFormFields } from "../../utils/hooks";
import LoadingButton from "../shared/LoadingButton";

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

const Login: React.FC<Props> = ({ setIsAuthenticated }) => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldsChange] = useFormFields({
    email: "",
    password: ""
  });
  const {t} = useTranslation();

  const validateForm = () => {
    return fields.email.length > 0 && fields.password.length >= 8;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      await Auth.signIn(fields.email, fields.password);
      setIsAuthenticated(true);
    } catch (error) {
      alert(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className={classes.root}>
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
        >
          Login
        </LoadingButton>
      </form>
    </div>
  );
};

export default Login;
