import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import SaveAltTwoToneIcon from '@material-ui/icons/SaveAltTwoTone';
import theme from '../components/ui/Theme';
// local imports
import { PlantContext } from '../contexts/PlantContext';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const useStyles = makeStyles({
  root: {
    width: 325,
    minHeight: 500,
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
  const classes = useStyles();
  const history = useHistory();
  const userId = localStorage.getItem('userId');
  const { image, name, species, taxonomy } = props;
  const { imageUrl, setImageUrl, setIsReloading, setPlants } = useContext(
    PlantContext
  );
  async function addPlant() {
    try {
      const res = await axiosWithAuth().post(
        `https://bw-water-my-plants.herokuapp.com/api/users/${userId}/plants`,
        {
          nickname: name,
          species: species ? species : '',
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

  const savePlant = e => {
    handleNewPlantSubmit(e);
  };

  return (
    <>
      <Card className={classes.root} disableRipple>
          <CardContent style={{ padding: 0 }}>
            <Grid
              container
              justify='space-between'
              alignItems='center'
              className={classes.cardHeaderContainer}
              style={{ padding: '0 1em' }}>
              <Grid item>
                <Typography
                  gutterBottom
                  variant='h4'
                  style={{ fontSize: '1.4rem' }}>
                  {name}
                </Typography>
              </Grid>
              {userId && (
                <Grid item>
                  <Typography
                    variant='iconButtonText'
                    className={classes.iconButtonText}
                    style={{ marginRight: '1em' }}>
                    Save to my plants
                  </Typography>
                  <IconButton
                    style={{ marginBottom: '.25em' }}
                    onClick={savePlant}>
                    <SaveAltTwoToneIcon style={{ color: 'red' }} />
                  </IconButton>
                </Grid>
              )}{' '}
            </Grid>
            <CardMedia
              className={classes.media}
              image={image && image}
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
              justify='space-between'
              style={{ padding: '1.5em' }}
              className={classes.bottomContainer}>
              <Grid
                item
                container
                align='left'
                className={classes.bottomInfo}
                direction='column'>
                {species && (
                  <>
                    <Typography
                      variant='h5'
                      color='textSecondary'
                      style={{ margin: 0, textTransform: 'capitalize' }}>
                      <span
                        style={{
                          fontWeight: 'bold',
                          color: theme.palette.common.green,
                        }}>
                        Species:
                      </span>{' '}
                      {species}
                    </Typography>{' '}
                  </>
                )}
                {taxonomy && taxonomy.plantClass && (
                  <>
                    <Typography
                      variant='h5'
                      color='textSecondary'
                      style={{ margin: 0 }}>
                      <span
                        style={{
                          fontWeight: 'bold',
                          color: theme.palette.common.green,
                        }}>
                        Class:
                      </span>{' '}
                      {taxonomy.plantClass}
                    </Typography>{' '}
                  </>
                )}
                {taxonomy && taxonomy.family && (
                  <>
                    <Typography
                      variant='h5'
                      color='textSecondary'
                      style={{ margin: 0 }}>
                      <span
                        style={{
                          fontWeight: 'bold',
                          color: theme.palette.common.green,
                        }}>
                        Family:
                      </span>{' '}
                      {taxonomy.family}
                    </Typography>{' '}
                  </>
                )}
                {taxonomy && taxonomy.kingdom && (
                  <>
                    <Typography
                      variant='h5'
                      color='textSecondary'
                      style={{ margin: 0 }}>
                      <span
                        style={{
                          fontWeight: 'bold',
                          color: theme.palette.common.green,
                        }}>
                        Kingdom:
                      </span>{' '}
                      {taxonomy.kingdom}
                    </Typography>{' '}
                  </>
                )}
                {taxonomy && taxonomy.phylum && (
                  <>
                    <Typography
                      variant='h5'
                      color='textSecondary'
                      style={{ margin: 0 }}>
                      <span
                        style={{
                          fontWeight: 'bold',
                          color: theme.palette.common.green,
                        }}>
                        Phylum:
                      </span>{' '}
                      {taxonomy.phylum}
                    </Typography>{' '}
                  </>
                )}
                {taxonomy && taxonomy.order && (
                  <>
                    <Typography
                      variant='h5'
                      color='textSecondary'
                      style={{ margin: 0 }}>
                      <span
                        style={{
                          fontWeight: 'bold',
                          color: theme.palette.common.green,
                        }}>
                        Order:
                      </span>{' '}
                      {taxonomy.order}
                    </Typography>
                  </>
                )}
              </Grid>
            </Grid>
          </CardContent>
      </Card>
    </>
  );
};

export default FindMyPlantCard;
