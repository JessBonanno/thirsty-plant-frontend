import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import makeStyles from '@material-ui/styles/makeStyles';
import theme from './ui/Theme';

// local imports
import { PlantContext } from '../contexts/PlantContext';

const useStyles = makeStyles(theme => ({}));

const FindMyPlant = () => {
  const classes = useStyles();
  const { uploading, setDetails, details, classifyPlant } = useContext(
    PlantContext
  );

  return (
    <>
      <Typography variant="h3">Find my Plant</Typography>
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
          onChange={classifyPlant}
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
            {uploading ? (
              <CircularProgress style={{ color: 'white' }} />
            ) : (
              <Typography variant="button">Upload Image</Typography>
            )}
          </Button>
        </label>
        {details.map(detail => {
          return (
            <>
              <div>
                {detail.plant_name}{' '}
                <img src={detail.similar_images[0].url} alt="" />{' '}
              </div>
              <Typography variant="h3">
                {detail.plant_details.structured_name.genus}{' '}
                {detail.plant_details.structured_name.species}
              </Typography>
              <p>{detail.plant_details.taxonomy.class}</p>
              <p>{detail.plant_details.taxonomy.family}</p>
              <p>{detail.plant_details.taxonomy.kingdom}</p>
              <p>{detail.plant_details.taxonomy.phylum}</p>
              <p>{detail.plant_details.taxonomy.order}</p>
            </>
          );
        })}
      </Grid>
    </>
  );
};

export default FindMyPlant;
