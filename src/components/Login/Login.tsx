import { Button, makeStyles, TextField, Theme } from "@material-ui/core";
import { Auth } from "aws-amplify";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useHistory } from "react-router-dom";
import "./Login.css";

interface Props {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateForm = () => {
    return email.length > 0 && password.length >= 8;
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      await Auth.signIn(email, password);
      setIsAuthenticated(true);
      history.push("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="Login">
      <form onSubmit={handleSubmit} className={classes.root}>
        <TextField
          required
          autoFocus
          id="outlined-required"
          label="E-Mail"
          placeholder="max@mustermann.com"
          variant="outlined"
          fullWidth
          onChange={e => setEmail(e.target.value)}
          value={email}
        />
        <TextField
          required
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          fullWidth
          onChange={e => setPassword(e.target.value)}
          value={password}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          disabled={!validateForm()}
          type="submit"
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;