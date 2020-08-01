import React, { useContext, useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { PlantContext } from '../contexts/PlantContext';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Hidden from '@material-ui/core/Hidden';
import CircularProgress from '@material-ui/core/CircularProgress';
import placeHolder from '../assets/images/placeholder-image.png';
import theme from '../components/ui/Theme';

const useStyles = makeStyles(theme => ({
  bodyOuterContainer: {
    width: '100%',
  },
  bodyContainer: {
    [theme.breakpoints.down('sm')]: {
      padding: '.5em',
    },
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalHeader: {
    ...theme.typography.modalHeader,
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    outline: 'none',
    border: 0,
    width: 630,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '100vh',
    },
  },
  formField: {
    margin: '1em 0',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  inputOuterContainer: {
    padding: '0 2em',
    // margin: '2em 1em',
    boxShadow: '0',
    [theme.breakpoints.down('sm')]: {
      padding: '1em',
      margin: 0,
    },
  },
  buttonsOuterContainer: {
    margin: '2em',
    [theme.breakpoints.down('sm')]: {
      margin: '1em',
    },
  },
  buttonsContainer: {
    width: '100%',
  },
  mainButtonsContainer: {
    [theme.breakpoints.down('sm')]: {
      marginTop: '1em',
      padding: '0 2em',
    },
  },
  imageDiv: {
    [theme.breakpoints.down('sm')]: {
      margin: '1em',
    },
  },
}));

export default function AddEditModal(props) {
  const classes = useStyles();

  const {
    matchesSM,
    imageUrl,
    setImageUrl,
    addModalOpen,
    setAddModalOpen,
    handleClose,
    uploading,
    setUploading,
    handleEditModalClose,
    editing,
    setEditing,
  } = useContext(PlantContext);

  const {
    setIsReloading,
    setPlants,
    id,
    nickname,
    species,
    currentImageUrl,
    editModalOpen,
    setEditModalOpen,
    h2oFrequency,
  } = props;

  const [open, setOpen] = useState(false);
  const [plantData, setPlantData] = useState({
    nickname: '',
    species: '',
    h2oFrequency: '',
    imageUrl: '',
  });

  const [formState, setFormState] = useState({
    species,
    nickname,
    h2oFrequency,
    imageUrl: currentImageUrl,
  });

  const handleChange = e => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const userId = localStorage.getItem('userId');

  let image;
  const handleUpload = async e => {
    setUploading(true);
    image = e.target.files[0];
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'wpnbbzl6');
    data.append('api_key', '925249979199193');
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/wpnbbzl6/image/upload`,
      data
    );
    const url = await res.data.url;
    setFormState({ ...formState, imageUrl: url });
    setUploading(false);
  };

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

  const handleNewPlantSubmit = async e => {
    e.preventDefault();
    try {
      await addPlant();
      setAddModalOpen(false);
      setImageUrl('');
      setIsReloading(true);
      await getPlants();
      setIsReloading(false);
    } catch (err) {
      console.log(err);
    }
  };

  async function editPlant() {
    try {
      const res = await axiosWithAuth().put(
        `https://bw-water-my-plants.herokuapp.com/api/plants/${id}`,
        formState
      );
      console.log(res);
    } catch (err) {
      console.log(err);
      setIsReloading(false);
    }
  }

  const handleEditSubmit = async e => {
    try {
      await editPlant();
      setEditModalOpen(false);
      setFormState({
        species: '',
        nickname: '',
        h2oFrequency: '',
        imageUrl: '',
      });
      setIsReloading(true);
      await getPlants();
      setIsReloading(false);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(editing);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={editing ? editModalOpen : addModalOpen}
        onClose={editing ? handleEditModalClose : handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          style: {
            opacity: '0.3',
            border: 'none',
          },
        }}
      >
        <Fade in={editing ? editModalOpen : addModalOpen}>
          <div className={classes.paper}>
            <Grid
              container
              direction="column"
              alignItems="center"
              className={classes.addEditContainer}
            >
              <Grid
                item
                style={{
                  backgroundColor: theme.palette.common.green,
                  color: 'white',
                  width: '100%',
                  padding: '1em',
                }}
              >
                <Typography
                  variant="modalHeader"
                  className={classes.modalHeader}
                >
                  {editing ? 'Edit' : 'Add'} Plant
                </Typography>
              </Grid>
              <Grid item className={classes.bodyOuterContainer}>
                <Grid
                  container
                  direction={matchesSM ? 'column' : 'row'}
                  justify="space-between"
                  className={classes.bodyContainer}
                >
                  <Grid
                    item
                    className={classes.inputOuterContainer}
                    style={{ width: matchesSM ? undefined : '49%' }}
                  >
                    <Grid
                      container
                      className={classes.inputContainer}
                      direction="column"
                    >
                      <Grid item>
                        {editing ? (
                          <TextField
                            className={classes.formField}
                            variant="outlined"
                            label="Plant name"
                            name="nickname"
                            value={formState.nickname}
                            onChange={handleChange}
                          />
                        ) : (
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
                        )}
                      </Grid>
                      <Grid item classsName={classes.input}>
                        {editing ? (
                          <TextField
                            className={classes.formField}
                            variant="outlined"
                            label="Species name"
                            name="species"
                            value={formState.species}
                            onChange={handleChange}
                          />
                        ) : (
                          <TextField
                            className={classes.formField}
                            variant="outlined"
                            label="Species name"
                            name="species"
                            onChange={handleChange}
                          />
                        )}
                      </Grid>
                      <Grid item classsName={classes.input}>
                        {editing ? (
                          <TextField
                            className={classes.formField}
                            variant="outlined"
                            label="Time between waterings"
                            name="h2oFrequency"
                            value={formState.h2oFrequency}
                            onChange={handleChange}
                          />
                        ) : (
                          <TextField
                            className={classes.formField}
                            variant="outlined"
                            label="Time between waterings"
                            name="h2oFrequency"
                            onChange={handleChange}
                          />
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    className={classes.image}
                    align="center"
                    style={{ width: matchesSM ? undefined : '49%' }}
                  >
                    <div
                      className={classes.imageDiv}
                      style={{
                        backgroundImage: editing
                          ? `url(${formState.imageUrl})`
                          : `url(${imageUrl})`,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        height: 200,
                        // width: 200,
                        margin: matchesSM ? '1em' : '4em 0 1em',
                        border: editing
                          ? (formState.imageUrl && 'none') ||
                            (imageUrl && 'none')
                          : '1px solid lightgray',
                      }}
                    ></div>
                  </Grid>
                </Grid>
                <Grid item className={classes.buttonsOuterContainer}>
                  <Grid
                    container
                    direction={matchesSM ? 'column' : 'row-reverse'}
                    justify="space-between"
                    className={classes.buttonsContainer}
                  >
                    <Grid
                      item
                      className={classes.uploadButton}
                      align="center"
                      style={{ width: matchesSM ? undefined : '49%' }}
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
                            <Typography variant="button">
                              Upload Image
                            </Typography>
                          )}
                        </Button>
                      </label>
                    </Grid>
                    <Grid item className={classes.mainButtonsOuterContainer}>
                      <Grid
                        container
                        direction="row"
                        justify={matchesSM ? 'space-around' : 'space-between'}
                        className={classes.mainButtonsContainer}
                      >
                        <Grid item>
                          <Button
                            variant="contained"
                            style={{
                              backgroundColor: theme.palette.common.lightPink,
                            }}
                            className={classes.button}
                            onClick={() => {
                              if (editing) {
                                setEditModalOpen(false);
                                setEditing(false);
                              } else {
                                setAddModalOpen(false);
                              }
                            }}
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
                            onClick={
                              editing ? handleEditSubmit : handleNewPlantSubmit
                            }
                          >
                            <Typography variant="button">Submit</Typography>
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
