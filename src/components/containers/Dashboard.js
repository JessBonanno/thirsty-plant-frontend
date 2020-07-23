import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { fade, makeStyles } from '@material-ui/core/styles';

import theme from '../ui/Theme';
import PlantCard from '../PlantCard';

const useStyles = makeStyles(theme => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
    border: '1px solid lightgray',
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const array = [1, 2, 3, 4, 5, 6];

const Dashboard = () => {
  // this insures page always renders at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const classes = useStyles();

  return (
    <Grid container direction="column">
      {/* ----- Page Header ---- */}
      <Grid item style={{ margin: '1em' }}>
        <Typography variant="h2">My Plants</Typography>
      </Grid>
      {/* ---- Plant Bar ----- */}
      <Grid
        item
        container
        direction="row"
        justify="space-between"
        style={{ margin: '1em' }}
      >
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            style={{ color: 'white' }}
          >
            Add New Plant
          </Button>
        </Grid>
        <Grid item>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Grid>
      </Grid>
      <Grid item container direction="row">
        {array.map(item => (
          <PlantCard />
        ))}
      </Grid>
    </Grid>
  );
};

export default Dashboard;
