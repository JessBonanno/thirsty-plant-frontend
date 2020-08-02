import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { PlantContext } from '../contexts/PlantContext';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import Hidden from '@material-ui/core/Hidden';
import theme from './ui/Theme';
// local imports
import { axiosWithAuth } from '../utils/axiosWithAuth';
// transition function from material ui
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

/**
 * Component for handling user plant deletion
 *
 * @export
 * @param {number} id the id of the plant to be deleted
 * @param {boolean} dialogOpen the state of the delete dialog
 * @returns {jsx}
 */

const useStyles = makeStyles(theme => ({
  mainButtonsContainer: {
    padding: '0 1em',
    [theme.breakpoints.down('xs')]: {
      marginTop: '1em',
      padding: '0 2em',
    },
  },
}));

export default function DeleteDialog(props) {
  const classes = useStyles();
  const userId = localStorage.getItem('userId');
  const { id, dialogOpen, setDialogOpen, setPlants, setIsReloading } = props;
  const { matchesXS } = useContext(PlantContext);

  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  async function deletePlant() {
    try {
      const res = await axiosWithAuth().delete(
        `https://bw-water-my-plants.herokuapp.com/api/plants/${id}`
      );
      console.log(res);
    } catch (err) {
      console.log(err);
      setDialogOpen(false);
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

  const handleDeletePlant = async e => {
    e.preventDefault();
    try {
      await deletePlant();
      setDialogOpen(false);
      await getPlants();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Dialog
      open={dialogOpen}
      BackdropProps={{ style: { opacity: '0.5' } }}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleDialogClose}
      aria-labelledby='delete-plant-dialog'
      aria-describedby='delete-plant-dialog'>
      <DialogTitle id='dialog-title'>{"Don't kale my vibe!"}</DialogTitle>
      <DialogContent>
        <DialogContentText id='dialog-description'>
          Are you sure you want to delete this plant?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Hidden xsDown>
          <Grid
            container
            direction='row'
            justify={'flex-end'}
            className={classes.mainButtonsContainer}>
            <Grid item>
              <Button
                variant='contained'
                style={{
                  backgroundColor: theme.palette.common.lightPink,
                }}
                className={classes.button}
                onClick={handleDialogClose}>
                <Typography variant='button'>Cancel</Typography>
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant='contained'
                style={{
                  backgroundColor: theme.palette.common.green,
                  marginLeft: matchesXS ? 0 : '1em',
                }}
                className={classes.button}
                onClick={handleDeletePlant}>
                <Typography variant='button'>Delete</Typography>
              </Button>
            </Grid>
          </Grid>
        </Hidden>

        <Hidden smUp>
          <Button onClick={handleDialogClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleDeletePlant} color='primary'>
            Delete
          </Button>
        </Hidden>
      </DialogActions>
    </Dialog>
  );
}
