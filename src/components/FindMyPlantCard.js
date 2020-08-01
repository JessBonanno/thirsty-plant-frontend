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
  const {
    image,
    name,
    species,
    plantClass,
    kingdom,
    phylum,
    order,
    family,
  } = props;

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
                <Typography
                  gutterBottom
                  variant="h4"
                  style={{ fontSize: '1.4rem' }}
                >
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
              style={{ padding: '1.5em' }}
              className={classes.bottomContainer}
            >
              <Grid
                item
                container
                align="left"
                className={classes.bottomInfo}
                direction="column"
              >
                <Typography
                  variant="h5"
                  color="textSecondary"
                  style={{ margin: 0 }}
                >
                  <span
                    style={{
                      fontWeight: 'bold',
                      color: theme.palette.common.green,
                    }}
                  >
                    Species:
                  </span>{' '}
                  {species}
                </Typography>{' '}
                <Typography
                  variant="h5"
                  color="textSecondary"
                  style={{ margin: 0 }}
                >
                  <span
                    style={{
                      fontWeight: 'bold',
                      color: theme.palette.common.green,
                    }}
                  >
                    Class:
                  </span>{' '}
                  {plantClass}
                </Typography>{' '}
                <Typography
                  variant="h5"
                  color="textSecondary"
                  style={{ margin: 0 }}
                >
                  <span
                    style={{
                      fontWeight: 'bold',
                      color: theme.palette.common.green,
                    }}
                  >
                    Family:
                  </span>{' '}
                  {family}
                </Typography>{' '}
                <Typography
                  variant="h5"
                  color="textSecondary"
                  style={{ margin: 0 }}
                >
                  <span
                    style={{
                      fontWeight: 'bold',
                      color: theme.palette.common.green,
                    }}
                  >
                    Kingdom:
                  </span>{' '}
                  {kingdom}
                </Typography>{' '}
                <Typography
                  variant="h5"
                  color="textSecondary"
                  style={{ margin: 0 }}
                >
                  <span
                    style={{
                      fontWeight: 'bold',
                      color: theme.palette.common.green,
                    }}
                  >
                    Phylum:
                  </span>{' '}
                  {phylum}
                </Typography>{' '}
                <Typography
                  variant="h5"
                  color="textSecondary"
                  style={{ margin: 0 }}
                >
                  <span
                    style={{
                      fontWeight: 'bold',
                      color: theme.palette.common.green,
                    }}
                  >
                    Order:
                  </span>{' '}
                  {order}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};

export default FindMyPlantCard;
