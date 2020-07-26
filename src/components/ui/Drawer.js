import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { IconButton } from '@material-ui/core';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  drawer: {
    backgroundColor: theme.palette.primary.main,
  },
  drawerItems: {
    marginTop: '5em',
    color: 'white',
  },
}));
/**
 * Drawer component containing navigation links for footer
 *
 * @returns {jsx}
 */
const FooterDrawer = () => {
  const history = useHistory();
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

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
      role='presentation'
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}>
      <List>
        <ListItem button>
          <a
            style={{ textDecoration: 'none', color: 'white' }}
            href='https://infallible-curie-a39dce.netlify.app/'>
            <ListItemText primary={'Home'} />
          </a>
        </ListItem>
        <ListItem button component={Link} to='/dashboard'>
          <ListItemText primary={'Dashboard'} />
        </ListItem>
        <ListItem button>
          <a
            style={{ textDecoration: 'none', color: 'white' }}
            href='https://infallible-curie-a39dce.netlify.app/about.html'>
            <ListItemText primary={'About Us'} />
          </a>
        </ListItem>
        <ListItem button>
          <a
            style={{ textDecoration: 'none', color: 'white' }}
            href='https://infallible-curie-a39dce.netlify.app/guide.html'>
            <ListItemText primary={'Learn'} />
          </a>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button component={Link} to='/login'>
          <ListItemText primary={'Login'} />
        </ListItem>
        <ListItem button component={Link} to='/signup'>
          <ListItemText primary={'Sign Up'} />
        </ListItem>
        <ListItem button component={Link} to='/'>
          <ListItemText primary={'Logout'} />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <>
        <IconButton
          edge='start'
          color='inherit'
          style={{ color: 'white' }}
          aria-label='open drawer'
          onClick={toggleDrawer(true)}>
          <MenuIcon style={{ fontSize: '1.5em' }} />
        </IconButton>
        <Drawer
          classes={{ paper: classes.drawer }}
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}>
          {list}
        </Drawer>
      </>
    </div>
  );
};
export default FooterDrawer;
