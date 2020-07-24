import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import theme from '../components/ui/Theme';

const placeholderImage = require('../assets/images/plant-for-card.jpg');

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: '50px',
    width: 654,
    height: 500,
  },
  formField: {
    margin: '1em 0',
    width: 230,
    borderRadius: 0,
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

  const { setEditModalOpen, editModalOpen } = props;
  const classes = useStyles();

  const handleOpen = () => {
    setEditModalOpen(true);
  };

  const handleClose = () => {
    setEditModalOpen(false);
  };

  const handleChange = e => {
    console.log(e.target.value);
    setPlantData({
      ...plantData,
      [e.target.name]: e.target.value,
    });
  };

  console.log(editModalOpen);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={editModalOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={editModalOpen}>
          <div className={classes.paper}>
            <Grid container direction="column">
              {' '}
              {/* --- Main container */}
              <Grid item>
                <Typography variant="h4" style={{ marginBottom: 20 }}>
                  Edit a Plant
                </Typography>
              </Grid>
              <Grid item>
                {/* --- Form and upload image container */}
                <Grid container direction="row">
                  <Grid item style={{ width: '50%' }}>
                    <form>
                      <Grid container direction="column">
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
                      </Grid>
                    </form>
                    <Grid container direction="column">
                      <Grid item>
                        <Typography variant="h5" style={{ margin: '20px 0' }}>
                          Watering Frequency
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Grid container direction="row">
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
                              marginLeft: '1em',
                            }}
                            className={classes.button}
                          >
                            <Typography variant="button">Submit</Typography>
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    {/* <Typography variant="h5">Image</Typography> */}
                    <Grid container direction="column" justify="flex-end">
                      <Grid item>
                        <img
                          src={require('../assets/images/plant-for-card.jpg')}
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
                              Change Image
                            </Typography>
                          </Button>
                        </label>
                      </Grid>
                    </Grid>
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
