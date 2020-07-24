import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Hidden from '@material-ui/core/Hidden';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import theme from '../components/ui/Theme';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: '50px',
    width: 654,
    height: 500,
    outline: 'none',
    [theme.breakpoints.down('sm')]: {
      height: 550,
      width: 400,
      padding: 20,
    },
  },
  formField: {
    margin: '1em 0',
    width: 230,
    borderRadius: 0,
    [theme.breakpoints.down('sm')]: {
      margin: '10px 0',
    },
  },
  button: {
    borderRadius: 0,
    color: theme.palette.common.white,
  },
}));

const inputProps = {
  padding: '4px',
};

export default function TransitionsModal(props) {
  const [plantData, setPlantData] = useState({
    nickname: '',
    species: '',
    wateringTime: '',
  });

  const { setAddModalOpen, addModalOpen } = props;
  const classes = useStyles();

  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));
  const matchesLG = useMediaQuery(theme.breakpoints.down('lg'));

  const handleOpen = () => {
    setAddModalOpen(true);
  };

  const handleClose = () => {
    setAddModalOpen(false);
  };

  const handleChange = e => {
    console.log(e.target.value);
    setPlantData({
      ...plantData,
      [e.target.name]: e.target.value,
    });
  };

  console.log(addModalOpen);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={addModalOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={addModalOpen}>
          <div className={classes.paper}>
            <Grid
              container
              direction="column"
              alignItems={matchesSM && 'center'}
            >
              {' '}
              {/* --- Main container */}
              <Grid item>
                <Typography variant="h4" style={{ marginBottom: 20 }}>
                  Add a Plant
                </Typography>
              </Grid>
              <Grid item>
                {/* --- Form and upload image container */}
                <Grid container direction="row">
                  <Grid item style={{ width: matchesSM ? '100%' : '50%' }}>
                    <Grid container direction="column">
                      <form>
                        <Grid item>
                          <TextField
                            className={classes.formField}
                            variant="outlined"
                            label="Plant name"
                          />
                        </Grid>
                        <Grid item>
                          <TextField
                            className={classes.formField}
                            variant="outlined"
                            label="Species name"
                          />
                        </Grid>{' '}
                      </form>

                      <Grid item align={matchesSM && 'center'}>
                        <Typography
                          variant="h5"
                          style={{
                            margin: matchesSM ? '20px auto 0' : '20px 0',
                            textAlign: matchesSM && 'center',
                            height: matchesSM && 30,
                          }}
                        >
                          Watering Frequency
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Grid
                          container
                          direction="row"
                          justify={matchesSM && 'center'}
                        >
                          <FormControl
                            variant="outlined"
                            className={classes.formControl}
                          >
                            <Grid item>
                              <Grid
                                container
                                direction="row"
                                alignItems="center"
                              >
                                <Grid item>
                                  <Typography variant="h6">Every </Typography>
                                </Grid>
                                <Grid item>
                                  <TextField
                                    className={`${classes.formField} without-padding`}
                                    style={{
                                      marginLeft: 10,
                                      marginRight: 10,
                                      width: 40,
                                      padding: '4px',
                                      // height: 20,
                                    }}
                                    inputProps={inputProps}
                                    variant="outlined"
                                  />
                                </Grid>
                                <Grid item>
                                  <Typography variant="h6">Day(s)</Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                          </FormControl>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        direction="row"
                        justify={matchesSM && 'space-between'}
                        style={{ marginTop: '2em' }}
                      >
                        <Grid item>
                          <Button
                            variant="contained"
                            style={{
                              backgroundColor: theme.palette.common.lightPink,
                            }}
                            className={classes.button}
                          >
                            <Typography variant="button">Cancel</Typography>
                          </Button>
                        </Grid>
                        <Grid item>
                          <Button
                            variant="contained"
                            style={{
                              backgroundColor: theme.palette.common.green,
                              marginLeft: matchesSM ? 0 : '1em',
                            }}
                            className={classes.button}
                          >
                            <Typography variant="button">Submit</Typography>
                          </Button>
                        </Grid>
                      </Grid>
                      <Hidden mdUp>
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
                          />
                          <label htmlFor="raised-button-file">
                            <Button
                              variant="contained"
                              component="span"
                              className={classes.button}
                              style={{
                                backgroundColor: theme.palette.common.yellow,
                              }}
                            >
                              <Typography variant="button">
                                Upload Image
                              </Typography>
                            </Button>
                          </label>
                        </Grid>
                      </Hidden>
                    </Grid>
                  </Grid>
                  <Grid item>
                    {/* <Typography variant="h5">Image</Typography> */}
                    <Hidden smDown>
                      <Grid container direction="column" justify="flex-end">
                        <Grid item>
                          <img
                            // src={require('../assets/images/plant-for-card.jpg')}
                            src={`https://res.cloudinary.com/watermyplants/image/upload/v1595611616/plant_card_image_a0wvvj.jpg`}
                            alt=""
                            width="300"
                            height="350"
                          />
                        </Grid>
                        <Grid
                          item
                          className="uploadButton"
                          style={{ alignSelf: 'flex-end', marginTop: 2.5 }}
                        >
                          <input
                            accept="image/*"
                            className={classes.input}
                            style={{ display: 'none' }}
                            id="raised-button-file"
                            multiple
                            type="file"
                          />
                          <label htmlFor="raised-button-file">
                            <Button
                              variant="contained"
                              component="span"
                              className={classes.button}
                              style={{
                                backgroundColor: theme.palette.common.yellow,
                              }}
                            >
                              <Typography variant="button">
                                Upload Image
                              </Typography>
                            </Button>
                          </label>
                        </Grid>
                      </Grid>
                    </Hidden>
                  </Grid>
                </Grid>
                {/* --- Watering frequencey, buttons */}
              </Grid>
            </Grid>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
