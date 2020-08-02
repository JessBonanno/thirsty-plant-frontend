import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import makeStyles from '@material-ui/styles/makeStyles';
import theme from './ui/Theme';
import FindMyPlantCard from './FindMyPlantCard';
import placeholder from '../assets/images/no-image-placeholder.jpg';

// local imports
import { PlantContext } from '../contexts/PlantContext';
// data for testing instead of making api calls just replace details in cardcontainer below
// import { data } from '../assets/data/plants.js';

const useStyles = makeStyles(theme => ({}));

const FindMyPlant = () => {
  const classes = useStyles();
  const {
    finding,
    setFinding,
    details,
    classifyPlant,
    matchesSM,
    handleUpload,
    imageUrl,
  } = useContext(PlantContext);

  const startSearch = e => {
    setFinding(true);
    classifyPlant(e);
    handleUpload(e);
  };

  console.log(imageUrl);

  return (
    <Grid
      container
      direction='column'
      alignItems={matchesSM ? 'center' : 'flex-start'}
      style={{ padding: '2em', margin: '1em 0' }}>
      <Grid item>
        <Typography variant='h3'>Find my Plant</Typography>
      </Grid>
      <Grid
        item
        className='uploadButton'
        style={{
          alignSelf: 'center',
          marginTop: '2.5em',
        }}>
        <input
          accept='image/*'
          className={classes.input}
          style={{ display: 'none' }}
          id='raised-button-file'
          multiple
          type='file'
          onChange={startSearch}
        />
        <label htmlFor='raised-button-file'>
          <Button
            variant='contained'
            component='span'
            className={classes.button}
            style={{
              backgroundColor: theme.palette.common.yellow,
              width: 200,
              height: 50,
            }}>
            {finding ? (
              <CircularProgress style={{ color: 'white' }} />
            ) : (
              <Typography variant='button'>Upload Image</Typography>
            )}
          </Button>
        </label>
        <Grid
          item
          container
          direction='row'
          justify='center'
          className={classes.cardsContainer}
          style={{ padding: '2em 0 ' }}>
          {details &&
            details.length !== 0 &&
            details.map(detail => {
              return (
                <Grid item align='center'>
                  <FindMyPlantCard
                    name={detail.plant_name}
                    image={
                      detail.similar_images.length > 0
                        ? detail.similar_images[0].url
                        : placeholder
                    }
                    species={detail.plant_details.structured_name.species}
                    taxonomy={detail.plant_details.taxonomy}
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
