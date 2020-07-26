import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

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
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar variant='dense'>
          <Grid container justify='space-between'>
            <Grid item>
              <Typography variant='h6' color='inherit'>
                Water My Plants
              </Typography>
            </Grid>
            <Grid item>
              <Grid container>
                <Grid item>
                  <Button color='inherit'>
                    <a
                      style={{ textDecoration: 'none', color: 'white' }}
                      href='https://infallible-curie-a39dce.netlify.app/'>
                      Home
                    </a>
                  </Button>
                </Grid>
                <Grid item>
                  <Button component={Link} to='/dashboard' color='inherit'>
                    Dashboard
                  </Button>
                </Grid>
                <Grid item>
                  <Button color='inherit'>
                    <a
                      style={{ textDecoration: 'none', color: 'white' }}
                      href='https://infallible-curie-a39dce.netlify.app/about.html'>
                      About Us
                    </a>
                  </Button>
                </Grid>
                <Grid item>
                  <Button color='inherit'>
                    <a
                      style={{ textDecoration: 'none', color: 'white' }}
                      href='https://infallible-curie-a39dce.netlify.app/guide.html'>
                      Learn
                    </a>
                  </Button>
                </Grid>
                <Grid item>
                  <Button component={Link} to='/login' color='inherit'>
                    Login
                  </Button>
                </Grid>
                <Grid item>
                  <Button component={Link} to='/signup' color='inherit'>
                    Sign Up
                  </Button>
                </Grid>
                <Grid item>
                  <Button component={Link} to='/' color='inherit'>
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
