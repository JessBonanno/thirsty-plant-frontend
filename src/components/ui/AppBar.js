import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import theme from '../ui/Theme';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Box from '@material-ui/core/Box';

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
  const userId = localStorage.getItem('userId');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  };

  const popover = (
    <PopupState variant='popover' popupId='demo-popup-popover'>
      {popupState => (
        <div>
          <IconButton
            style={{
              color:
                pathname === '/login' || pathname === '/signup'
                  ? theme.palette.common.lightGreen
                  : 'white',
            }}
            {...bindTrigger(popupState)}>
            <AccountCircleTwoToneIcon />
          </IconButton>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}>
            <Box
              p={2}
              style={{
                backgroundColor:
                  pathname === '/login' || pathname === '/signup'
                    ? 'white'
                    : theme.palette.common.lightGreen,
                padding: 0,
              }}>
              <List
                dense={true}
                style={{
                  backgroundColor: theme.palette.primary.main,
                  color:
                    pathname === '/login' || pathname === '/signup'
                      ? theme.palette.common.lightGreen
                      : 'white',
                  borderRadius: 0,
                  width: 150,
                }}>
                <ListItem component={Link} to='/settings'>
                  <ListItemText>
                    <Typography
                      variant='p'
                      style={{
                        fontFamily: 'Raleway',
                        fontSize: '1.2rem',
                        color: 'white',
                        textDecoration: 'none',
                      }}>
                      Settings
                    </Typography>
                  </ListItemText>
                </ListItem>
                <Divider />
                <ListItem component={Link} to='/' onClick={handleLogout}>
                  <ListItemText>
                    <Typography
                      variant='p'
                      style={{
                        fontFamily: 'Raleway',
                        fontSize: '1.2rem',
                        color: 'white',
                        textDecoration: 'none',
                      }}>
                      Logout
                    </Typography>
                  </ListItemText>
                </ListItem>
              </List>
            </Box>
          </Popover>
        </div>
      )}
    </PopupState>
  );
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
                      href='https://watermyplantsjuly2020.netlify.app/'>
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
                      href='https://watermyplantsjuly2020.netlify.app/about.html'>
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
                      href='https://watermyplantsjuly2020.netlify.app/guide.html'>
                      Learn
                    </a>
                  </Button>
                </Grid>

                {!userId ? (
                  <>
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
                  </>
                ) : (
                  <>
                    <Grid item>{popover}</Grid>
                  </>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
