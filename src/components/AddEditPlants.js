import React, { useContext, useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { PlantContext } from '../contexts/PlantContext';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import placeHolder from '../assets/images/placeholder.jpg';
import theme from '../components/ui/Theme';

const useStyles = makeStyles(theme => ({
  addEditContainer: {},
  bodyOuterContainer: {
    // width: '50%',
    marginTop: '3em',

    [theme.breakpoints.down('xs')]: {
      marginTop: 0,
      // width: '100%',
    },
  },
  bodyContainer: {
    [theme.breakpoints.down('xs')]: {
      padding: '.5em',
    },
  },
  header: {
    ...theme.typography.header,
  },
  formField: {
    margin: '1em 0',
    width: 300,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  inputOuterContainer: {
    padding: '0 2em',
    // margin: '2em 1em',
    [theme.breakpoints.down('xs')]: {
      padding: '1em',
      margin: 0,
    },
  },
  buttonsOuterContainer: {
    margin: '2em 1em',

    [theme.breakpoints.down('xs')]: {
      margin: '1em',
    },
  },
  buttonsContainer: {
    width: '100%',
  },
  mainButtonsContainer: {
    padding: '0 1em',
    [theme.breakpoints.down('xs')]: {
      marginTop: '1em',
      padding: '0 2em',
    },
  },
  imageDiv: {
    [theme.breakpoints.down('xs')]: {
      margin: '1em',
    },
  },
}));

export default function AddEditPlants(props) {
  const history = useHistory();
  const classes = useStyles();

  const {
    matchesXS,
    imageUrl,
    setImageUrl,
    uploading,
    setUploading,
    editing,
    setEditing,
    setPlants,
    setIsReloading,
    isReloading,
    plants,
  } = useContext(PlantContext);

  const { nickname, species, currentImageUrl, h2oFrequency } = props;

  const { id } = useParams();

  const [plantData, setPlantData] = useState({
    nickname: '',
    species: '',
    h2oFrequency: '',
    imageUrl: '',
  });

  const plant = plants.filter(plant => plant.id === Number(id))[0];

  const [formState, setFormState] = useState({
    species: '',
    nickname: '',
    h2oFrequency: '',
    imageUrl: '',
  });

  console.log(plant);
  console.log(plants);

  console.log(id);
  const handleChange = e => {
    setPlantData({
      ...plantData,
      [e.target.name]: e.target.value,
    });

    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (plant) {
      setFormState({
        species: plant.species,
        nickname: plant.nickname,
        h2oFrequency: plant.h2oFrequency,
        imageUrl: plant.imageUrl,
      });
    }
  }, [plant]);

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
    setImageUrl(url);
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
      setImageUrl('');
      setIsReloading(true);
      await getPlants();
      setIsReloading(false);
      history.push('/dashboard');
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
      setFormState({
        species: '',
        nickname: '',
        h2oFrequency: '',
        imageUrl: '',
      });
      setIsReloading(true);
      await getPlants();
      setIsReloading(false);
      history.push('/dashboard');
    } catch (err) {
      console.log(err);
    }
  };

  console.log(editing);

  return (
    <Grid
      container
      direction="column"
      // alignItems="flex-start"
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
        <Typography variant="header" className={classes.header}>
          {editing ? 'Edit' : 'Add'} Plant
        </Typography>
      </Grid>
      <Grid item className={classes.bodyOuterContainer}>
        <Grid
          container
          direction={matchesXS ? 'column' : 'row'}
          className={classes.bodyContainer}
          spacing={0}
        >
          <Grid
            item
            className={classes.inputOuterContainer}
            // style={{ width: matchesXS ? undefined : '49%' }}
            lg={3}
            md={4}
            sm={6}
            xs={12}
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
            lg={3}
            md={3}
            sm={6}
            xs={12}
            item
            className={classes.image}
            align="center"
            // style={{ width: matchesXS ? undefined : '49%' }}
          >
            <div
              className={classes.imageDiv}
              style={{
                backgroundImage: editing
                  ? formState.imageUrl
                    ? `url(${formState.imageUrl})`
                    : `url(${placeHolder})`
                  : imageUrl
                  ? `url(${imageUrl})`
                  : `url(${placeHolder})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                height: matchesXS ? 100 : 200,
                // width: 200,
                margin: matchesXS ? '1em' : '4em 0 1em',
                // border: editing
                //   ? (formState.imageUrl && 'none') ||
                //     (imageUrl && 'none')
                //   : '1px solid lightgray',
              }}
            ></div>
          </Grid>
        </Grid>
        <Grid item className={classes.buttonsOuterContainer}>
          <Grid
            container
            direction={matchesXS ? 'column-reverse' : 'row'}
            spacing={2}
            className={classes.buttonsContainer}
          >
            <Grid
              item
              className={classes.mainButtonsOuterContainer}
              lg={3}
              md={4}
              sm={6}
              xs={12}
            >
              <Grid
                container
                direction="row"
                justify={matchesXS ? 'space-evenly' : 'flex-start'}
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
                        setEditing(false);
                        history.push('/dashboard');
                      } else {
                        history.push('/dashboard');
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
                      marginLeft: matchesXS ? 0 : '1em',
                    }}
                    className={classes.button}
                    onClick={editing ? handleEditSubmit : handleNewPlantSubmit}
                  >
                    <Typography variant="button">Submit</Typography>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              lg={3}
              md={3}
              sm={6}
              xs={12}
              className={classes.uploadButton}
              align="center"
              // style={{ width: matchesXS ? undefined : '49%' }}
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
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
