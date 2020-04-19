import { Button, Menu, MenuItem } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { AccountCircle } from '@material-ui/icons';
import MenuIcon from "@material-ui/icons/Menu";
import { Auth } from 'aws-amplify';
import clsx from 'clsx';
import React, { ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useHistory } from "react-router-dom";
import { ROUTE } from '../../config';
import { useAppContext } from '../../utils/context';
import PersistentDrawer from './PersistentDrawer';

const drawerWidth = 200;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  title: {
    flexGrow: 1,
    fontSize: "1.25rem",
    textAlign: "center",
    "&:hover": {
      textDecoration: "none",
    },
  },
}));

interface Props {
  children: ReactNode;
}

const Navbar = ({ children }: Props) => {
  const classes = useStyles();
  let history = useHistory();
  const { t } = useTranslation();
  const { isAuthenticated, setIsAuthenticated } = useAppContext();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(true);

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

  const handleLogout = async () => {
    await Auth.signOut();
    setAnchorEl(null);
    setIsAuthenticated!(false);
    history.push(ROUTE.LOGIN);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: drawerOpen,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setDrawerOpen(true)}
            edge="start"
            className={clsx(classes.menuButton, drawerOpen && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
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
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="account-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
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
      <PersistentDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: drawerOpen,
        })}
      >
        <div className={classes.drawerHeader} />
        {children}
      </main>
    </div >
  );
}

export default Navbar
