import React, { useState } from 'react';
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
import placeholderImage from '../assets/images/placholder-plant.jpg';

import { axiosWithAuth } from '../utils/axiosWithAuth';

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

const FindMyPlantCard = props => {
  const { image, name, species } = props;

  const classes = useStyles();

  return (
    <>
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
                  {name}
                </Typography>
              </Grid>
            </Grid>
            <CardMedia
              className={classes.media}
              image={image}
              title={name}
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
                  ></Grid>
                </Grid>
                <Grid item style={{ margin: 0, padding: '1em 0' }}>
                  <Typography variant="h6" color="textSecondary">
                    Next watering:
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                  ></Typography>
                  <Grid container justify="space-between" alignItems="center">
                    <Grid item style={{ width: '70%' }}>
                      <Typography variant="h6" color="textSecondary">
                        Last watering:
                      </Typography>
                      <Typography
                        variant="body1"
                        color="textSecondary"
                      ></Typography>
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

export default FindMyPlantCard;
