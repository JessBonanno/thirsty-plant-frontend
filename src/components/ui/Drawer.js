import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { IconButton, Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';
import theme from '../ui/Theme';
// context
import { PlantContext } from '../../contexts/PlantContext';

/**
 * Drawer component containing navigation links for footer
 *
 * @returns {jsx}
 */
const FooterDrawer = () => {
  const { pathname } = useLocation();
  const useStyles = makeStyles(theme => ({
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
    drawer: {
      backgroundColor:
        pathname === '/login' || pathname === '/signup'
          ? 'white'
          : theme.palette.primary.main,
    },
    drawerItems: {
      marginTop: '5em',
      color:
        pathname === '/login' || pathname === '/signup'
          ? theme.palette.common.lightGreen
          : 'white',
    },
  }));

  const classes = useStyles();

  const { drawerOpen, setDrawerOpen } = useContext(PlantContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleAccountsClick = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const toggleDrawer = open => event => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setDrawerOpen(open);
  };

  const list = (
    <div
      className={classes.drawerItems}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem>
          <img
            src={
              pathname === '/login' || pathname === '/signup'
                ? require('../../assets/images/logo.png')
                : require('../../assets/images/logo-white.png')
            }
            alt="logo"
            style={{ height: 30, width: 30, marginRight: 10 }}
          />
        </ListItem>
        <ListItem>
          <Typography
            variant="h6"
            style={{
              color:
                pathname === '/login' || pathname === '/signup'
                  ? theme.palette.common.lightGreen
                  : 'white',
            }}
          >
            Water My Plants
          </Typography>
        </ListItem>
        <Divider />
        <ListItem button>
          <a
            style={{
              textDecoration: 'none',
              color:
                pathname === '/login' || pathname === '/signup'
                  ? theme.palette.common.lightGreen
                  : 'white',
            }}
            href="https://infallible-curie-a39dce.netlify.app/"
          >
            <ListItemText>
              <Typography
                variant="p"
                primary="Settings"
                style={{
                  fontFamily: 'Raleway',
                }}
              >
                Home
              </Typography>
            </ListItemText>
          </a>
        </ListItem>
        <ListItem button component={Link} to="/dashboard">
          <ListItemText>
            <Typography
              variant="p"
              primary="Settings"
              style={{
                fontFamily: 'Raleway',
              }}
            >
              Dashboard
            </Typography>
          </ListItemText>
        </ListItem>
        <ListItem button>
          <a
            style={{
              textDecoration: 'none',
              color:
                pathname === '/login' || pathname === '/signup'
                  ? theme.palette.common.lightGreen
                  : 'white',
            }}
            href="https://infallible-curie-a39dce.netlify.app/about.html"
          >
            <ListItemText>
              <Typography
                variant="p"
                primary="Settings"
                style={{
                  fontFamily: 'Raleway',
                }}
              >
                About Us
              </Typography>
            </ListItemText>
          </a>
        </ListItem>
        <ListItem button>
          <a
            style={{
              textDecoration: 'none',
              color:
                pathname === '/login' || pathname === '/signup'
                  ? theme.palette.common.lightGreen
                  : 'white',
            }}
            href="https://infallible-curie-a39dce.netlify.app/guide.html"
          >
            <ListItemText>
              <Typography
                variant="p"
                primary="Settings"
                style={{
                  fontFamily: 'Raleway',
                }}
              >
                Learn
              </Typography>
            </ListItemText>
          </a>
        </ListItem>
      </List>
      <Divider />
      <ListItem style={{ padding: 0 }}>
        <IconButton
          style={{
            color:
              pathname === '/login' || pathname === '/signup'
                ? theme.palette.common.lightGreen
                : 'white',
          }}
          onClick={handleAccountsClick}
        >
          <AccountCircleTwoToneIcon />
        </IconButton>
      </ListItem>
      <List>
        <ListItem button component={Link} to="/login">
          <ListItemText>
            <Typography
              variant="p"
              primary="Settings"
              style={{
                fontFamily: 'Raleway',
              }}
            >
              Login
            </Typography>
          </ListItemText>
        </ListItem>
        <ListItem button component={Link} to="/signup">
          <ListItemText>
            <Typography
              variant="p"
              primary="Settings"
              style={{
                fontFamily: 'Raleway',
              }}
            >
              Sign Up
            </Typography>
          </ListItemText>
        </ListItem>
        <ListItem button component={Link} to="/settings">
          <ListItemText>
            <Typography
              variant="p"
              primary="Settings"
              style={{
                fontFamily: 'Raleway',
              }}
            >
              Settings
            </Typography>
          </ListItemText>
        </ListItem>
        <ListItem button component={Link} to="/">
          <ListItemText>
            <Typography
              variant="p"
              primary="Settings"
              style={{
                fontFamily: 'Raleway',
              }}
            >
              Logout
            </Typography>
          </ListItemText>
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <>
        <IconButton
          edge="start"
          color="inherit"
          style={{
            color:
              pathname === '/login' || pathname === '/signup'
                ? theme.palette.common.lightGreen
                : 'white',
          }}
          aria-label="open drawer"
          onClick={toggleDrawer(true)}
        >
          <MenuIcon
            style={{
              fontSize: '1.5em',
              color:
                (pathname === '/login' || pathname === '/signup') &&
                theme.palette.common.lightGreen,
            }}
          />
        </IconButton>
        <Drawer
          classes={{ paper: classes.drawer }}
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          {list}
        </Drawer>
      </>
    </div>
  );
};
export default FooterDrawer;
