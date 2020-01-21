import { AppBar, Button, Drawer, IconButton, Link, List, ListItem, ListItemIcon, Toolbar, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Euro, FormatListBulleted, Home, Person } from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import { Auth } from "aws-amplify";
import React, { useState } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { TisAuthenticated, TsetIsAuthenticated } from "../../utils/customTypes";

interface Props {
  isAuthenticated: TisAuthenticated;
  setIsAuthenticated: TsetIsAuthenticated;
}

type ToggleEvent = any;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    fontSize: "1.25rem",
    textAlign: "center",

    "&:hover": {
      textDecoration: "none"
    }
  },
  list: {
    width: 250
  },
  sideList: {
    padding: "0"
  },
  sideItem: {
    fontSize: "1.5rem",
    paddingTop: "20px",
    paddingBottom: "20px",
    borderBottom: "1px solid hsl(0, 24%, 89%)"
  }
}));

const sidebarItems = [
  { id: 1, text: "Dashboard", path: "/", icon: "Home" },
  { id: 2, text: "Todos", path: "/todos", icon: "FormatListBulleted" },
  { id: 3, text: "Guests", path: "/guests", icon: "Person" },
  { id: 4, text: "Budget", path: "/budget", icon: "Euro" }
];

const Navbar: React.FC<Props> = ({ isAuthenticated, setIsAuthenticated }) => {
  const classes = useStyles();
  let history = useHistory();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = useState(1);

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
    setIsAuthenticated(false);
    history.push("/login");
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
                {text}
              </ListItem>
            </Link>
          ))}
        </List>
      </div>
    );
  };

  const renderSiteTitle = () => {
    const path = history.location.pathname;

    switch (path) {
      case "/":
        return "Dashboard";
      case "/todos":
        return "Todos";
      case "/guests":
        return "Guests";
      case "/budget":
        return "Budget";
      default:
        return "";
    }
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
          {renderSiteTitle()}
        </Typography>

        {isAuthenticated ? (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <>
            <Button color="inherit" component={RouterLink} to="/signup">
              Signup
            </Button>
            <Button color="inherit" component={RouterLink} to="/login">
              Login
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
