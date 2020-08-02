import React, { useContext, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import theme from './ui/Theme';
import FindMyPlantCard from './FindMyPlantCard';
import placeholder from '../assets/images/no-image-placeholder.jpg';
// local imports
import { PlantContext } from '../contexts/PlantContext';

// * data for testing instead of making api calls just replace details in .cardContainer below
// import { data } from '../assets/data/plants.js';

const FindMyPlant = () => {
  // this ensures page always renders at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const {
    matchesXS,
    finding,
    setFinding,
    details,
    classifyPlant,
    matchesSM,
    handleUpload,
  } = useContext(PlantContext);

  const startSearch = e => {
    setFinding(true);
    classifyPlant(e);
    handleUpload(e);
  };

  return (
    <Grid
      container
      direction='column'
      alignItems={matchesSM ? 'center' : 'flex-start'}
      style={{ padding: '2em', margin: '1em 0' }}>
      <Grid item>
        <Typography
          variant='h3'
          style={{
            fontSize: matchesXS && '2.8rem',
            textAlign: matchesXS && 'center',
          }}>
          Find my Plant
        </Typography>
        <Typography
          variant='subtitle1'
          style={{
            textAlign: matchesXS && 'center',
            fontSize: matchesXS && '1.4rem',
          }}>
          Upload an image to identify your plant
        </Typography>
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
