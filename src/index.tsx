import { MuiThemeProvider } from "@material-ui/core";
import Amplify from "aws-amplify";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "typeface-roboto";
import App from "./components/App";
import { amplifyConfig } from "./config";
import "./index.css";
import store from "./store/store";
import { customTheme } from "./theme";
import { initSentry } from "./utils/error";
import "./utils/i18n/i18n";

Amplify.configure(amplifyConfig);
initSentry();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <MuiThemeProvider theme={customTheme}>
        <App />
      </MuiThemeProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
