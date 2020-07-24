import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Toolbar, AppBar } from '@material-ui/core/';

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
/**
 * Footer component displaying a drawer of nav link items on mobile screen sizes
 *
 * @export
 * @returns {jsx}
 */
export default function BottomAppBar() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />

      <AppBar position='fixed' color='primary' className={classes.appBar}>
        <Toolbar>
          <Drawer />
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
