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
// eslint-disable-next-line
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import theme from '../components/ui/Theme';

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
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function TransitionsModal(props) {
  const [wateringTime, setWateringTime] = useState();

  const { setEditModalOpen, editModalOpen } = props;
  const classes = useStyles();
// eslint-disable-next-line
  const handleOpen = () => {
    setEditModalOpen(true);
  };

  const handleClose = () => {
    setEditModalOpen(false);
  };

  const handleSetWateringTime = e => {
    setWateringTime(e.target.value);
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
                <Typography variant="h4">Add/Edit a Plant</Typography>
              </Grid>
              <Grid item>
                {/* --- Form and upload image container */}
                <Grid container direction="row">
                  <Grid item>
                    <form>
                      <Grid container direction="column">
                        <Grid item>
                          <TextField variant="outlined" label="Plant name" />
                        </Grid>
                        <Grid item>
                          <TextField variant="outlined" label="Species name" />
                        </Grid>{' '}
                      </Grid>
                    </form>
                  </Grid>
                  <Grid item>
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
                        variant="raised"
                        component="span"
                        className={classes.button}
                      >
                        Upload
                      </Button>
                    </label>
                  </Grid>
                </Grid>
                {/* --- Watering frequencey, buttons */}
                <Grid container direction="column">
                  <Grid item>
                    <Typography variant="h5">Watering Frequency</Typography>
                  </Grid>
                  <Grid item>
                    <Grid container direction="row">
                      <FormControl
                        variant="outlined"
                        className={classes.formControl}
                      >
                        <Grid item>
                          <Grid container direction="row">
                            <Grid item>
                              <Typography>Every </Typography>
                            </Grid>
                            <Grid item>
                              <TextField variant="outlined" />
                            </Grid>
                            <Grid item>
                              <Typography>Day(s), in the</Typography>
                            </Grid>
                            <Grid item>
                              {/* <InputLabel htmlFor="outlined-age-native-simple">
                                Age
                              </InputLabel> */}
                              <Select
                                native
                                value={wateringTime}
                                onChange={e => handleSetWateringTime(e)}
                                // label="Age"
                                inputProps={{
                                  // name: 'age',
                                  id: 'outlined-age-native-simple',
                                }}
                              >
                                <option aria-label="None" value="" />
                                <option value={10}>Morning</option>
                                <option value={20}>Afternoon</option>
                                <option value={30}>Evening</option>
                              </Select>
                            </Grid>
                          </Grid>
                        </Grid>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container direction="row">
                <Grid item>
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: theme.palette.common.lightPink,
                      color: 'white',
                    }}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: theme.palette.common.green,
                      color: 'white',
                    }}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
