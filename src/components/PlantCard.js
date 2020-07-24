import React, { useState } from 'react';
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
// Local Imports
import DeleteDialog from '../components/DeleteDialog';
import EditPlantModal from '../components/EditPlantModal';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: '1em',
    minWidth: 250,
  },
  media: {
    height: 140,
  },
});

const PlantCard = props => {
  const { id } = props;
  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = useState();

  const [addModalOpen, setAddModalOpen] = React.useState(false);
  const [editModalOpen, setEditModalOpen] = React.useState(true);

  const handleAddModalOpen = () => {
    setAddModalOpen(true);
  };

  const handleEditModalOpen = () => {
    setEditModalOpen(true);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  return (
    <>
      <EditPlantModal
        editModalOpen={editModalOpen}
        setEditModalOpen={setEditModalOpen}
      />
      <DeleteDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        plantId={id}
      />
      <Card className={classes.root}>
        <CardActionArea>
          <CardContent style={{ padding: 0 }}>
            <Grid
              container
              justify="space-between"
              alignItems="center"
              style={{ padding: '0 1em' }}
            >
              <Grid item>
                <Typography gutterBottom variant="h5" component="h2">
                  Plant Name
                </Typography>
              </Grid>
              <Grid item>
                <IconButton
                  style={{ marginBottom: '.25em' }}
                  onClick={handleDialogOpen}
                >
                  <DeleteTwoToneIcon />
                </IconButton>
              </Grid>
            </Grid>
            <CardMedia
              className={classes.media}
              image={require('../assets/images/plant-for-card.jpg')}
              title="Contemplative Reptile"
              style={{ marginBottom: '1em' }}
            />
            <Grid item container style={{ padding: '0 1em' }}>
              <Grid item container style={{ width: '75%' }} direction="column">
                <Grid item>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Species Name Goes Here
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Next Watering Time
                  </Typography>
                </Grid>
              </Grid>
              <Grid item style={{ marginLeft: 'auto' }}>
                <IconButton
                  style={{ marginBottom: '.25em' }}
                  onClick={handleEditModalOpen}
                >
                  <EditTwoToneIcon />
                </IconButton>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};

export default PlantCard;
