import { AppBar, Button, Divider, Drawer, IconButton, Link, List, ListItem, ListItemIcon, Menu, MenuItem, Toolbar, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { AccountCircle, Euro, FormatListBulleted, Home, Person } from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import { Auth } from "aws-amplify";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { ROUTE } from "../../config";
import logo from "../../static/images/logo.png";
import { useAppContext } from "../../utils/context";

type ToggleEvent = any;

const useStyles = makeStyles((theme: Theme) => ({
  toolbar: theme.mixins.toolbar,
  logoContainer: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    width: "100%",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontSize: "1.25rem",
    textAlign: "center",

    "&:hover": {
      textDecoration: "none",
    },
  },
  list: {
    width: 250,
  },
  sideList: {
    padding: "0",
  },
  sideItem: {
    fontSize: "1.5rem",
    paddingTop: "20px",
    paddingBottom: "20px",
    borderBottom: "1px solid hsl(0, 24%, 89%)",
  },
}));

const sidebarItems = [
  { id: 1, text: "Dashboard", path: "/", icon: "Home" },
  { id: 2, text: "todos", path: ROUTE.TODOS, icon: "FormatListBulleted" },
  { id: 3, text: "guests", path: ROUTE.GUESTS, icon: "Person" },
  { id: 4, text: "budget", path: ROUTE.BUDGET, icon: "Euro" },
];

const Navbar: React.FC = () => {
  const classes = useStyles();
  let history = useHistory();
  const { isAuthenticated, setIsAuthenticated } = useAppContext();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const toggleDrawer = (open: boolean) => (event: ToggleEvent) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsSidebarOpen(open);
  };

  const handleLogout = async () => {
    await Auth.signOut();
    setAnchorEl(null);
    setIsAuthenticated!(false);
    history.push(ROUTE.LOGIN);
  };

  const renderIcon = (icon: string) => {
    switch (icon) {
      case "Home":
        return <Home />;
      case "FormatListBulleted":
        return <FormatListBulleted />;
      case "Person":
        return <Person />;
      case "Euro":
        return <Euro />;
      default:
        return <Home />;
    }
  };

  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
  };

  const sideList = () => {
    return (
      <div
        className={classes.list}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <div className={`${classes.toolbar} ${classes.logoContainer}`}>
          <img src={logo} alt="logo" className={classes.logo} />
        </div>

        <Divider />
        <List className={classes.sideList}>
          {sidebarItems.map(({ id, text, path, icon }) => (
            <Link
              color="inherit"
              underline="none"
              component={RouterLink}
              to={path}
              key={text}
            >
              <ListItem
                button
                className={classes.sideItem}
                selected={selectedIndex === id}
                onClick={() => handleListItemClick(id)}
              >
                <ListItemIcon>{renderIcon(icon)}</ListItemIcon>
                {t(text)}
              </ListItem>
            </Link>
          ))}
        </List>
      </div>
    );
  };

  const renderSiteTitle = () => {
    const path = history.location.pathname.split("/");
    const lastPath = "/" + path[path.length - 1];

    switch (lastPath) {
      case "":
        return t("dashboard");
      case ROUTE.TODOS:
        return t("todos");
      case ROUTE.GUESTS:
        return t("guests");
      case ROUTE.BUDGET:
        return t("budget");
      case "settings":
        return t("settings");
      case "new":
        return t("newEntry");
      default:
        return t("");
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
        <Drawer open={isSidebarOpen} onClose={toggleDrawer(false)}>
          {sideList()}
        </Drawer>
        <Typography color="inherit" className={classes.title}>
          {isAuthenticated && renderSiteTitle()}
        </Typography>

        {isAuthenticated ? (
          <>
            <IconButton
              edge="end"
              color="inherit"
              aria-controls="account-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="account-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                color="inherit"
                component={RouterLink}
                to={ROUTE.SETTINGS}
              >
                {t("settings")}
              </MenuItem>
              <MenuItem onClick={handleLogout}>{t("logout")}</MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Button color="inherit" component={RouterLink} to={ROUTE.SIGNUP}>
              {t("signup")}
            </Button>
            <Button color="inherit" component={RouterLink} to={ROUTE.LOGIN}>
              {t("login")}
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
