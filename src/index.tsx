import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import Amplify from "aws-amplify";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "typeface-roboto";
import App from "./components/App";
import { config } from "./config";
import "./index.css";
import './utils/i18n/i18n';
import { initSentry } from "./utils/error";

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.Auth.REGION,
    userPoolId: config.Auth.USER_POOL_ID,
    identityPoolId: config.Auth.IDENTITY_POOL_ID,
    userPoolWebClientId: config.Auth.APP_CLIENT_ID
  },
  API: {
    endpoints: [
      {
        name: config.API.NAME,
        endpoint: config.API.ENDPOINT,
        region: config.API.REGION
      }
    ]
  },
  Analytics: {
    disabled: config.Analytics.DISABLED
  }
});

const customTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#e33371"
    }
  }
});

initSentry();

ReactDOM.render(
  <BrowserRouter>
    <MuiThemeProvider theme={customTheme}>
      <App />
    </MuiThemeProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
