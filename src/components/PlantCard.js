import React, { useContext, useState } from 'react';
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
import EditPlantModal from '../components/EditPlantModal';

// context
import { PlantContext } from '../contexts/PlantContext';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    minWidth: 245,
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
  const { id, nickname, species, imageUrl, lastWatered, h2oFrequency } = props;
  const { fetchParams, setFetchParams, useFetch } = useContext(PlantContext);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState();

  const classes = useStyles();

  const handleEditModalOpen = () => {
    setEditModalOpen(true);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const waterPlant = () => {
    const wateringDate = new Date(Date.now()).toISOString();
    setFetchParams({
      method: 'put',
      url: `/plants/${id}`,
      data: { lastWatered: wateringDate },
    });
  };
  const getWateringDate = moment(lastWatered, 'YYYMMDD').add(
    h2oFrequency,
    'days'
  );
  const nextWatering = moment(getWateringDate).format('ll');

  return (
    <>
      <EditPlantModal
        id={id}
        nickname={nickname}
        species={species}
        currentImageUrl={imageUrl}
        h2oFrequency={h2oFrequency}
        editModalOpen={editModalOpen}
        setEditModalOpen={setEditModalOpen}
      />
      <DeleteDialog id={id} />
      <Card className={classes.root} disableRipple>
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
              image={imageUrl}
              title="Contemplative Reptile"
              style={{ marginBottom: '1em', height: 167 }}
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
                          onClick={handleEditModalOpen}
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
                    {nextWatering}
                  </Typography>
                  <Grid container justify="space-between" alignItems="center">
                    <Grid item style={{ width: '70%' }}>
                      <Typography variant="h6" color="textSecondary">
                        Last watering:
                      </Typography>
                      <Typography variant="body1" color="textSecondary">
                        {moment(lastWatered).format('lll')}
                      </Typography>
                    </Grid>
                    <Grid item style={{ marginLeft: 'auto', maxWidth: '29%' }}>
                      <Grid container direction="column" alignItems="center">
                        <Grid item>
                          <IconButton
                            style={{ padding: 5 }}
                            onClick={waterPlant}
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
