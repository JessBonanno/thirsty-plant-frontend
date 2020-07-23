import React from 'react';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: '1em',
  },
  media: {
    height: 140,
  },
});

const PlantCard = () => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Typography gutterBottom variant="h5" component="h2">
                Plant Name
              </Typography>
            </Grid>
            <Grid item>
              <IconButton style={{ marginBottom: '.25em' }}>
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
          <Typography variant="body2" color="textSecondary" component="p">
            Species Name Goes Here
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Next Watering Time
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PlantCard;
