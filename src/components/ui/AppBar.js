import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import theme from '../ui/Theme';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));
/**
 *  AppBar component displaying nav link items on desktop screen sizes
 *
 * @export
 * @returns {jsx}
 */

export default function DenseAppBar() {
  const { pathname } = useLocation();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar
        position='static'
        style={{
          backgroundColor:
            (pathname === '/login' || pathname === '/signup') && 'white',
        }}>
        <Toolbar variant='dense'>
          <Grid container justify='space-between'>
            <Grid item>
              <Grid container alignItems='center' style={{ marginTop: 5 }}>
                <Grid item>
                  <img
                    src={
                      pathname === '/login' || pathname === '/signup'
                        ? require('../../assets/images/logo.png')
                        : require('../../assets/images/logo-white.png')
                    }
                    alt='logo'
                    style={{ height: 30, width: 30, marginRight: 10 }}
                  />
                </Grid>

                <Grid item>
                  <Typography
                    variant='h6'
                    color='inherit'
                    style={{
                      color:
                        pathname === '/login' || pathname === '/signup'
                          ? theme.palette.common.lightGreen
                          : 'white',
                    }}>
                    Water My Plants
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container>
                <Grid item>
                  <Button color='inherit'>
                    <a
                      style={{
                        textDecoration: 'none',
                        color:
                          pathname === '/login' || pathname === '/signup'
                            ? theme.palette.common.lightGreen
                            : 'white',
                      }}
                      href='https://infallible-curie-a39dce.netlify.app/'>
                      Home
                    </a>
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    component={Link}
                    to='/dashboard'
                    color='inherit'
                    style={{
                      color:
                        pathname === '/login' || pathname === '/signup'
                          ? theme.palette.common.lightGreen
                          : 'white',
                    }}>
                    Dashboard
                  </Button>
                </Grid>
                <Grid item>
                  <Button color='inherit'>
                    <a
                      style={{
                        textDecoration: 'none',
                        color:
                          pathname === '/login' || pathname === '/signup'
                            ? theme.palette.common.lightGreen
                            : 'white',
                      }}
                      href='https://infallible-curie-a39dce.netlify.app/about.html'>
                      About Us
                    </a>
                  </Button>
                </Grid>
                <Grid item>
                  <Button color='inherit'>
                    <a
                      style={{
                        textDecoration: 'none',
                        color:
                          pathname === '/login' || pathname === '/signup'
                            ? theme.palette.common.lightGreen
                            : 'white',
                      }}
                      href='https://infallible-curie-a39dce.netlify.app/guide.html'>
                      Learn
                    </a>
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    component={Link}
                    to='/login'
                    color='inherit'
                    style={{
                      color:
                        pathname === '/login' || pathname === '/signup'
                          ? theme.palette.common.lightGreen
                          : 'white',
                    }}>
                    Login
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    component={Link}
                    to='/signup'
                    color='inherit'
                    style={{
                      color:
                        pathname === '/login' || pathname === '/signup'
                          ? theme.palette.common.lightGreen
                          : 'white',
                    }}>
                    Sign Up
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    component={Link}
                    to='/'
                    color='inherit'
                    style={{
                      color:
                        pathname === '/login' || pathname === '/signup'
                          ? theme.palette.common.lightGreen
                          : 'white',
                    }}>
                    Logout
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
