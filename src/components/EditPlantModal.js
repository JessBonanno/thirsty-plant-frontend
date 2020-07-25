import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import theme from '../components/ui/Theme';
import Hidden from '@material-ui/core/Hidden';

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

/**
 * Modal component allowing a user to edit selected plant
 *
 * @export
 * @param {boolean} editModalOpen holds open state of modal
 * @param {function} setEditModalOpen changes open state of modal
 * @returns {jsx}
 */
export default function TransitionsModal(props) {
  const [plantData, setPlantData] = useState({
    nickname: '',
    species: '',
    wateringTime: '',
  });
  const [imageUrl, setImageUrl] = useState('');

  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));
  const matchesLG = useMediaQuery(theme.breakpoints.down('lg'));

  const { setEditModalOpen, editModalOpen } = props;
  const classes = useStyles();

  const handleOpen = () => {
    setEditModalOpen(true);
  };

  const handleClose = () => {
    setEditModalOpen(false);
  };

  let image;
  const handleUpload = async e => {
    image = e.target.files[0];
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'wpnbbzl6');
    data.append('api_key', '925249979199193');
    console.log({ data });
    console.log(image);

    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/wpnbbzl6/image/upload`,
      data
    );

    const file = await res;
    console.log(file);
    setImageUrl(res.data.url);
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
            <Grid
              container
              direction="column"
              alignItems={matchesSM && 'center'}
            >
              {' '}
              {/* --- Main container */}
              <Grid item>
                {/* --- Form and upload image container */}
                <Grid
                  container
                  direction="row"
                  justify="space-around"
                  alignItems="center"
                >
                  <Grid item style={{ width: matchesSM ? '100%' : '50%' }}>
                    <Grid container direction="column">
                      <Grid item align={matchesSM && 'center'}>
                        <Typography variant="h4" style={{ marginBottom: 20 }}>
                          Edit Plant
                        </Typography>
                      </Grid>
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
                      </Hidden>
                    </Grid>
                  </Grid>
                  <Grid item align="center">
                    {/* <Typography variant="h5">Image</Typography> */}
                    <Hidden smDown>
                      <Grid item container direction="column">
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
                {/* --- Watering frequencey, buttons */}
              </Grid>
            </Grid>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
