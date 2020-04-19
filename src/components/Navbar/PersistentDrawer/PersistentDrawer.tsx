import { Divider, Drawer, IconButton, Link, List, ListItem, ListItemIcon, makeStyles, Theme } from '@material-ui/core';
import { ChevronLeft, Euro, FormatListBulleted, Home, Person } from '@material-ui/icons';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from "react-router-dom";
import { ROUTE } from '../../../config';

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: theme.custom.drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: theme.custom.drawerWidth,
    backgroundColor: theme.palette.primary.main
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  sideList: {
    padding: "0",
  },
  sideItem: {
    fontSize: "1rem",
    color: '#FFF',
    paddingTop: "10px",
    paddingBottom: "10px",
  },
  icon: {
    color: "#FFF"
  }
}));

const sidebarItems = [
  { id: 1, text: "Dashboard", path: "/", icon: "Home" },
  { id: 2, text: "todos", path: ROUTE.TODOS, icon: "FormatListBulleted" },
  { id: 3, text: "guests", path: ROUTE.GUESTS, icon: "Person" },
  { id: 4, text: "budget", path: ROUTE.BUDGET, icon: "Euro" },
];

interface Props {
  drawerOpen: boolean;
  setDrawerOpen: (shouldBeOpen: boolean) => void;
}

const PersistentDrawer = ({ drawerOpen, setDrawerOpen }: Props) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState(1);

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

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={drawerOpen}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={() => setDrawerOpen(false)} className={classes.icon}>
          <ChevronLeft />
        </IconButton>
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
              onClick={() => setSelectedIndex(id)}
            >
              <ListItemIcon className={classes.icon}>{renderIcon(icon)}</ListItemIcon>
              {t(text)}
            </ListItem>
          </Link>
        ))}
      </List>
    </Drawer>
  )
}

export default PersistentDrawer
