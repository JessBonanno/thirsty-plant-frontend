import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { fade, makeStyles } from '@material-ui/core/styles';
// local components
import PlantCard from '../PlantCard';
import AddPlantModal from '../AddPlantModal';
// context
import { PlantContext } from '../../contexts/PlantContext';
import AddButton from '../AddButton';
import { axiosWithAuth } from '../../utils/axiosWithAuth';

const useStyles = makeStyles(theme => ({
  modal: {
    border: 'none',
  },
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
    width: 250,
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

// const array = [1, 2, 3, 4, 5, 6];
/**
 * Dashboard component displays users plants and allows editing, deleting, searching and adding plants
 *
 * @returns {jsx}
 */
const Dashboard = () => {
  // this ensures page always renders at the top
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  const classes = useStyles();
  const { matchesXS, matchesSM, handleAddModalOpen, response } = useContext(
    PlantContext
  );

  const [plants, setPlants] = useState([]);
  const [isReloading, setIsReloading] = useState(false);

  useEffect(() => {
    setIsReloading(true);
    const userId = localStorage.getItem('userId');
    axiosWithAuth()
      .get(
        `https://bw-water-my-plants.herokuapp.com/api/users/${userId}/plants`
      )
      .then(res => {
        setPlants(res.data.plants);
        setIsReloading(false);
      });
  }, []);

  // useEffect(() => {
  //   if (response !== null) {
  //     setPlants(response.plants);
  //   }
  // }, [response]);

  return (
    <>
      <AddButton handleAddModalOpen={handleAddModalOpen} />
      <AddPlantModal
        className={classes.modal}
        setIsReloading={setIsReloading}
        setPlants={setPlants}
      />
      <Grid
        container
        direction="column"
        alignItems="center"
        className={classes.dashContainer}
      >
        {/* ----- Page Header ---- */}
        <Grid item style={{ margin: '1em', marginRight: 'auto' }}>
          <Typography
            variant="h2"
            className={classes.dashboardHeader}
            style={{ fontSize: '2rem' }}
          >
            My Plants
          </Typography>
        </Grid>
        {/* ---- Plant Bar ----- */}
        <Grid
          item
          container
          direction={matchesXS ? 'column' : 'row'}
          justify="space-between"
          alignItems={matchesXS ? 'center' : undefined}
          className={classes.toolsContainer}
          style={{
            padding: 15,
          }}
        >
          {plants && plants.length !== 0 && (
            <>
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  style={{
                    color: 'white',
                    marginBottom: matchesXS ? '1em' : undefined,
                    width: matchesXS && '100%',
                    borderRadius: 0,
                    display: matchesXS ? 'none' : 'block',
                  }}
                  onClick={handleAddModalOpen}
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
                    style={{
                      margin: 0,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </div>
              </Grid>
            </>
          )}
        </Grid>
        {isReloading ? (
          <Typography variant="h3">Fetching plant data...</Typography>
        ) : (
          <Grid
            item
            container
            direction="row"
            justify="center"
            className={classes.cardsContainer}
          >
            {plants && plants.length !== 0 ? (
              plants.map(item => (
                // 12 is full width, 6 half width, etc...
                <Grid item xs={12} sm={6} md={4} lg={3} align="center">
                  <PlantCard
                    key={item.id}
                    nickname={item.nickname}
                    species={item.species}
                    imageUrl={item.imageUrl}
                    lastWatered={item.lastWatered}
                    h2oFrequency={item.h2oFrequency}
                    id={item.id}
                    setPlants={setPlants}
                    setIsReloading={setIsReloading}
                  />
                </Grid>
              ))
            ) : (
              <Grid item>
                <Typography
                  variant="h3"
                  align="center"
                  style={{
                    margin: matchesSM ? '0.5em 0' : '1em 0',
                    padding: matchesSM ? '1em' : '2em',
                    fontSize: matchesSM && '2.2rem',
                  }}
                >
                  Get started, add your first plant now!
                </Typography>
                <Grid item align="center">
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{
                      color: 'white',
                      marginBottom: matchesXS ? '1em' : undefined,
                      display: matchesXS && 'none',
                      borderRadius: 0,
                      // display: matchesXS ? 'none' : 'block',
                    }}
                    onClick={handleAddModalOpen}
                  >
                    Add New Plant
                  </Button>
                </Grid>
              </Grid>
            )}
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default Dashboard;
