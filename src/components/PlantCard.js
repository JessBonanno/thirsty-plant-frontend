import React, { useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import InvertColorsTwoToneIcon from '@material-ui/icons/InvertColorsTwoTone';
import theme from '../components/ui/Theme';

// Local Imports
import DeleteDialog from '../components/DeleteDialog';
// import EditPlantModal from '../components/EditPlantModal';
import placeholderImage from '../assets/images/placholder-plant.jpg';

import { PlantContext } from '../contexts/PlantContext';

import { axiosWithAuth } from '../utils/axiosWithAuth';
import AddEditModal from './AddEditModal';

const useStyles = makeStyles({
  root: {
    width: 325,
    minHeight: 275,
    margin: '1em',
  },
  media: {
    height: 140,
  },

  iconButtonText: {
    ...theme.typography.iconButtonText,
  },
});

const PlantCard = props => {
  const history = useHistory();
  const { id, nickname, species, imageUrl, lastWatered, h2oFrequency } = props;

  const { setEditing, plants, setPlants, setIsReloading } = useContext(
    PlantContext
  );

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const userId = localStorage.getItem('userId');

  const classes = useStyles();

  const handleEditModalOpen = id => {
    setEditing(true);
    history.push(`/edit-plant/${id}`);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  async function submitWatering() {
    try {
      await waterPlant();
      await getPlants();
    } catch (err) {
      console.log(err);
    }
  }

  async function waterPlant() {
    const wateringDate = new Date(Date.now()).toISOString();
    try {
      const res = await axiosWithAuth().put(
        `https://bw-water-my-plants.herokuapp.com/api/plants/${id}`,
        {
          lastWatered: wateringDate,
        }
      );
      console.log(res);
    } catch (err) {
      console.log(err);
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

  const getWateringDate = moment(lastWatered, 'YYYYMMDD').add(
    h2oFrequency,
    'days'
  );
  const nextWatering = moment(getWateringDate).format('ll');

  return (
    <>
      <DeleteDialog
        id={id}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        setPlants={setPlants}
        setIsReloading={setIsReloading}
      />
      <Card className={classes.root} disableRipple raised={true}>
        <CardActionArea>
          <CardContent style={{ padding: 0 }}>
            <Grid
              container
              justify="space-between"
              alignItems="center"
              className={classes.cardHeaderContainer}
              style={{ padding: '0 1em' }}
            >
              <Grid item>
                <Typography gutterBottom variant="h4">
                  {nickname}
                </Typography>
              </Grid>
              <Grid item>
                <IconButton
                  style={{ marginBottom: '.25em' }}
                  onClick={handleDialogOpen}
                >
                  <DeleteTwoToneIcon style={{ color: 'red' }} />
                </IconButton>
              </Grid>
            </Grid>
            <CardMedia
              className={classes.media}
              image={imageUrl === '' ? placeholderImage : imageUrl}
              title="Contemplative Reptile"
              style={{
                marginBottom: '1em',
                height: 167,
                backgroundSize: 'contain',
              }}
            />
            <Grid
              item
              container
              justify="space-between"
              style={{ padding: '0 1em' }}
              className={classes.bottomContainer}
            >
              <Grid
                item
                container
                align="left"
                className={classes.bottomInfo}
                direction="column"
              >
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                >
                  <Grid item style={{ margin: 0, maxWidth: '70%' }}>
                    <Typography
                      variant="h5"
                      color="textSecondary"
                      style={{ margin: 0 }}
                    >
                      {species}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    style={{
                      marginLeft: 'auto',
                      marginTop: 'auto',
                      maxWidth: '25%',
                    }}
                  >
                    <Grid container direction="row" alignItems="center">
                      <Grid item>
                        <IconButton
                          style={{ marginBottom: '.25em', paddingRight: 10 }}
                          onClick={() => handleEditModalOpen(id)}
                        >
                          <EditTwoToneIcon />
                        </IconButton>
                      </Grid>
                      <Grid item style={{ marginLeft: 'auto' }}>
                        <Typography
                          variant="iconButtonText"
                          className={classes.iconButtonText}
                        >
                          Edit
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item style={{ margin: 0, padding: '1em 0' }}>
                  <Typography variant="h6" color="textSecondary">
                    Next watering:
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    {nextWatering !== 'Invalid date'
                      ? nextWatering
                      : 'Water to start tracking'}
                  </Typography>
                  <Grid container justify="space-between" alignItems="center">
                    <Grid item style={{ width: '70%' }}>
                      <Typography variant="h6" color="textSecondary">
                        Last watering:
                      </Typography>
                      <Typography variant="body1" color="textSecondary">
                        {moment(lastWatered).format('lll') !==
                        'Invalid date' ? (
                          moment(lastWatered).format('lll')
                        ) : (
                          <>
                            Never watered{'   '}
                            <i
                              class="fas fa-skull-crossbones"
                              style={{ color: 'rgba(0, 0, 0, 0.54)' }}
                            ></i>
                          </>
                        )}
                      </Typography>
                    </Grid>
                    <Grid item style={{ marginLeft: 'auto', maxWidth: '29%' }}>
                      <Grid container direction="column" alignItems="center">
                        <Grid item>
                          <IconButton
                            style={{ padding: 5 }}
                            onClick={submitWatering}
                          >
                            <InvertColorsTwoToneIcon
                              style={{ color: theme.palette.common.blue }}
                            />
                          </IconButton>
                        </Grid>
                        <Grid item>
                          <Typography
                            variant="iconButtonText"
                            className={classes.iconButtonText}
                          >
                            Water Now
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};

export default PlantCard;
