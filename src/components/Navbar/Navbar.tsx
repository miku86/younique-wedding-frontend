import { AppBar, Button, Drawer, IconButton, Link, List, ListItem, ListItemIcon, Toolbar } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { FormatListBulleted, Home, Person } from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import { Auth } from "aws-amplify";
import React from "react";
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
    "&:hover": {
      textDecoration: "none"
    }
  },
  list: {
    width: 250
  },
  sideItem: {
    fontSize: "1.5rem"
  }
}));

const sidebarItems = [
  { text: "Dashboard", path: "/", icon: "Home" },
  { text: "Todos", path: "/todos", icon: "FormatListBulleted" },
  { text: "Guests", path: "/guests", icon: "Person" }
];

const Navbar: React.FC<Props> = ({ isAuthenticated, setIsAuthenticated }) => {
  const classes = useStyles();
  let history = useHistory();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

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
      case "Dashboard":
        return <Home />;
      case "Todos":
        return <FormatListBulleted />;
      case "Guests":
        return <Person />;
      default:
        return <Home />;
    }
  };

  const sideList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {sidebarItems.map(({ text, path, icon }) => (
          <Link
            color="inherit"
            underline="none"
            component={RouterLink}
            to={path}
            key={text}
          >
            <ListItem button className={classes.sideItem}>
              <ListItemIcon>{renderIcon(icon)}</ListItemIcon>
              {text}
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

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
        <Link
          color="inherit"
          component={RouterLink}
          to="/"
          className={classes.title}
        >
          Younique Wedding
        </Link>

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
