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
  const { uploading, handleUpload } = useContext(PlantContext);
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
          onChange={handleUpload}
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
      </Grid>
    </>
  );
};

export default FindMyPlant;
