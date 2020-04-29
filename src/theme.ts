import { createMuiTheme } from "@material-ui/core";

export const customTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#ff4081",
    },
  },
  custom: {
    drawerWidth: 180
  }
});