import Amplify from "aws-amplify";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "typeface-roboto";
import App from "./components/App";
import config from "./config";
import "./index.css";

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
  }
});

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
