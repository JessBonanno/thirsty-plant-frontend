/*THIS COMPONENT CAN BE DELETED ONCE WE MERGE THE TSX VERSION TO MASTER*/

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Toolbar, AppBar, IconButton, Hidden } from '@material-ui/core/';

// local components
import Drawer from './Drawer';

const useStyles = makeStyles(theme => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
}));

export default function BottomAppBar({ handleLogout }) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />

      <AppBar position='fixed' color='primary' className={classes.appBar}>
        <Toolbar>
          {/* todo: going to use menu icon below for mobile and hide the top appbar */}
          <Drawer handleLogout={handleLogout} />
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
