import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import makeStyles from '@material-ui/styles/makeStyles';
import theme from './ui/Theme';
import FindMyPlantCard from './FindMyPlantCard';
import { data } from '../assets/data/plants.js';

// local imports
import { PlantContext } from '../contexts/PlantContext';

const useStyles = makeStyles(theme => ({}));

const FindMyPlant = () => {
  const classes = useStyles();
  const {
    finding,
    setFinding,
    setDetails,
    details,
    classifyPlant,
  } = useContext(PlantContext);

  const startSearch = e => {
    setFinding(true);
    classifyPlant(e);
  };

  console.log(finding);

  return (
    <Grid container direction="column" style={{ padding: '2em' }}>
      <Grid item>
        <Typography variant="h3">Find my Plant</Typography>
      </Grid>
      <Grid
        item
        className="uploadButton"
        style={{
          alignSelf: 'center',
          marginTop: '2.5em',
        }}
      >
        <input
          accept="image/*"
          className={classes.input}
          style={{ display: 'none' }}
          id="raised-button-file"
          multiple
          type="file"
          onChange={startSearch}
        />
        <label htmlFor="raised-button-file">
          <Button
            variant="contained"
            component="span"
            className={classes.button}
            style={{
              backgroundColor: theme.palette.common.yellow,
              width: 200,
              height: 50,
            }}
          >
            {finding ? (
              <CircularProgress style={{ color: 'white' }} />
            ) : (
              <Typography variant="button">Upload Image</Typography>
            )}
          </Button>
        </label>
        <Grid
          item
          container
          direction="row"
          justify="center"
          className={classes.cardsContainer}
          style={{ padding: '2em 0 0' }}
        >
          {details &&
            details.length !== 0 &&
            details.map(detail => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} align="center">
                  <FindMyPlantCard
                    name={detail.plant_name}
                    image={detail.similar_images[0].url}
                    species={detail.plant_details.structured_name.species}
                    plantClass={detail.plant_details.taxonomy.class}
                    family={detail.plant_details.taxonomy.family}
                    kingdom={detail.plant_details.taxonomy.kingdom}
                    phylum={detail.plant_details.taxonomy.phylum}
                    order={detail.plant_details.taxonomy.order}
                  />
                </Grid>
              );
            })}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FindMyPlant;
