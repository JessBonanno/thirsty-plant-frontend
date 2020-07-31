import React, { useContext, useState } from 'react';
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
import theme from '../components/ui/Theme';
// context
import { PlantContext } from '../contexts/PlantContext';

import { axiosWithAuth } from '../utils/axiosWithAuth';

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
    // height: 500,
    outline: 'none',
    [theme.breakpoints.down('sm')]: {
      // height: 550,
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
  const { setIsReloading, setPlants } = props;
  const classes = useStyles();

  const [plantData, setPlantData] = useState({
    nickname: '',
    species: '',
    h2oFrequency: '',
    imageUrl: '',
    // token: localStorage.getItem('token'),
  });

  const {
    matchesSM,
    imageUrl,
    handleUpload,
    addModalOpen,
    handleClose,
    setAddModalOpen,

    // userId,
  } = useContext(PlantContext);

  const handleChange = e => {
    e.persist();
    setPlantData({
      ...plantData,
      [e.target.name]: e.target.value,
    });
  };

  const userId = localStorage.getItem('userId');

  async function addPlant() {
    try {
      const res = await axiosWithAuth().post(
        `https://bw-water-my-plants.herokuapp.com/api/users/${userId}/plants`,
        {
          ...plantData,
          imageUrl: imageUrl,
        }
      );

      console.log(res);
    } catch (err) {
      console.log(err);
      setIsReloading(false);
    }
  }

  async function getPlants() {
    try {
      const res = await axiosWithAuth().get(
        `https://bw-water-my-plants.herokuapp.com/api/users/${userId}/plants`
      );
      console.log(res);
      setPlants(res.data.plants);
    } catch (err) {
      console.log(err);
      setIsReloading(false);
    }
  }

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await addPlant();
      setAddModalOpen(false);
      setIsReloading(true);
      await getPlants();
      setIsReloading(false);
    } catch (err) {
      console.log(err);
    }
  };

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
            {/* --- Main container */}
            <Grid
              className={classes.addContainer}
              container
              direction="column"
              alignItems={matchesSM && 'center'}
            >
              {' '}
              {/* --- Form and upload image container */}
              <Grid
                container
                direction="row"
                justify="space-around"
                alignItems="center"
              >
                <Grid item style={{ width: matchesSM ? '100%' : '50%' }}>
                  <Grid
                    container
                    direction="column"
                    className={classes.formContainer}
                  >
                    <Grid item align={matchesSM && 'center'}>
                      <Typography variant="h4" style={{ marginBottom: 20 }}>
                        Add a Plant
                      </Typography>
                    </Grid>
                    <form>
                      <Grid item>
                        <TextField
                          inputProps={{
                            maxLength: 15,
                          }}
                          className={classes.formField}
                          variant="outlined"
                          label="Plant name"
                          name="nickname"
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                          className={classes.formField}
                          variant="outlined"
                          label="Species name"
                          name="species"
                          onChange={handleChange}
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
                            <Grid container direction="row" alignItems="center">
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
                                  name="h2oFrequency"
                                  onChange={handleChange}
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
                    {/* buttons container */}
                    <Grid
                      className={classes.buttonContainer}
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
                          onClick={() => setAddModalOpen(false)}
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
                          <Typography variant="button" onClick={handleSubmit}>
                            Submit
                          </Typography>
                        </Button>
                      </Grid>
                    </Grid>
                    {/* mobile upload button */}
                    <Hidden mdUp>
                      <Grid
                        item
                        container
                        direction="column"
                        className={classes.imageUpload}
                      >
                        <Grid item align="center">
                          <div
                            style={{
                              backgroundImage: `url(${imageUrl})`,
                              backgroundSize: 'contain',
                              backgroundRepeat: 'no-repeat',
                              backgroundPosition: 'center',
                              height: 100,
                              // width: 150,
                              margin: 'auto',
                            }}
                          ></div>
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
                            onChange={handleUpload}
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
                {/* desktop upload container */}
                <Grid item align="center">
                  <Hidden smDown>
                    <Grid
                      item
                      container
                      direction="column"
                      className={classes.imageUpload}
                    >
                      <Grid item align="center">
                        <div
                          style={{
                            backgroundImage: `url(${imageUrl})`,
                            backgroundSize: 'cover',
                            height: 200,
                            // width: 150,
                            margin: 'auto',
                          }}
                        ></div>
                      </Grid>
                      <Grid
                        item
                        align="center"
                        className="uploadButton"
                        style={{
                          alignSelf: 'flex-end',
                          marginTop: 2.5,
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
            </Grid>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
