import { makeStyles, TextField, Theme } from "@material-ui/core";
import { Auth } from "aws-amplify";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { TsetIsAuthenticated } from "../../utils/customTypes";
import { useFormFields } from "../../utils/hooks";
import LoadingButton from "../shared/LoadingButton/LoadingButton";
import "./Login.css";

interface Props {
  setIsAuthenticated: TsetIsAuthenticated;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    "& .MuiTextField-root": {
      marginBottom: theme.spacing(3),
      width: 200
    }
  }
}));

const Login: React.FC<Props> = ({ setIsAuthenticated }) => {
  const classes = useStyles();
  let history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldsChange] = useFormFields({
    email: "",
    password: ""
  });

  const validateForm = () => {
    return fields.email.length > 0 && fields.password.length >= 8;
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      await Auth.signIn(fields.email, fields.password);
      setIsAuthenticated(true);
      history.push("/");
    } catch (error) {
      alert(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="Login">
      <form onSubmit={handleSubmit} className={classes.root}>
        <TextField
          label="E-Mail"
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
          label="Password"
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
