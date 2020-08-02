import React from 'react';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Toolbar, AppBar, Grid, Typography } from '@material-ui/core/';
import theme from '../ui/Theme';
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
    zIndex: 2000,
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
  copyrightText: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '.8rem',
    },
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
  const { pathname } = useLocation();

  return (
    <React.Fragment>
      <CssBaseline />

      <AppBar
        style={{
          backgroundColor:
            (pathname === '/login' || pathname === '/signup') && 'white',
        }}
        position="fixed"
        color="primary"
        className={classes.appBar}
      >
        <Toolbar>
          <Drawer />
          <Grid container justify="center">
            <Grid item align="bottom">
              <Typography
                variant="caption"
                className={classes.copyrightText}
                style={{
                  color:
                    pathname === '/login' || pathname === '/signup'
                      ? theme.palette.common.lightGreen
                      : 'white',
                }}
              >
                &copy; Copyright 2020, Lambda Track Team
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
