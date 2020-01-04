import { AppBar, Button, Drawer, IconButton, Link, List, ListItem, ListItemIcon, Toolbar } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import InboxIcon from "@material-ui/icons/MoveToInbox";
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
  }
}));

const sidebarItems = [
  { text: "Dashboard", path: "/" },
  { text: "Todos", path: "/todos" }
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

  const sideList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {sidebarItems.map(({text, path}) => (
          <ListItem button key={text}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <Link color="inherit" component={RouterLink} to={path}>
              {text}
            </Link>
          </ListItem>
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
