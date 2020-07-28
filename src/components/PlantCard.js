import React, { useContext } from 'react';
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
});

const PlantCard = props => {
  const { handleEditModalOpen, handleDialogOpen } = useContext(PlantContext);
  const { id, nickname, species, imageUrl, lastWatering, h2oFrequency } = props;
  const classes = useStyles();

  return (
    <>
      <EditPlantModal />
      <DeleteDialog plantId={id} />
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
                <Typography
                  gutterBottom
                  component="h2"
                  style={{
                    fontFamily: 'Mulish',
                    color: theme.palette.common.pink,
                  }}
                >
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
              image={require('../assets/images/plant-for-card.jpg')}
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
                          style={{ marginBottom: '.25em' }}
                          onClick={handleEditModalOpen}
                        >
                          <EditTwoToneIcon />
                        </IconButton>
                      </Grid>
                      <Grid item>
                        <Typography variant="caption">Edit</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item style={{ margin: 0, padding: '1em 0' }}>
                  <Typography variant="h6" color="textSecondary">
                    Next watering:
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    {moment()
                      .add(h2oFrequency + lastWatering, 'days')
                      .calendar()}
                  </Typography>
                  <Grid container justify="space-between" alignItems="center">
                    <Grid item style={{ width: '70%' }}>
                      <Typography variant="h6" color="textSecondary">
                        Last watering:
                      </Typography>
                      <Typography variant="body1" color="textSecondary">
                        {lastWatering}
                      </Typography>
                    </Grid>
                    <Grid item style={{ marginLeft: 'auto', maxWidth: '29%' }}>
                      <Grid container direction="column" alignItems="center">
                        <Grid item>
                          <IconButton style={{ padding: 5 }}>
                            <InvertColorsTwoToneIcon
                              style={{ color: theme.palette.common.blue }}
                            />
                          </IconButton>
                        </Grid>
                        <Grid item>
                          <Typography variant="caption">Water Now</Typography>
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
