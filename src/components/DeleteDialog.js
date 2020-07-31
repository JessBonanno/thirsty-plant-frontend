import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
// context
import { PlantContext } from '../contexts/PlantContext';

// api imports
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

export default function DeleteDialog({
  id,
  dialogOpen,
  setDialogOpen,
  setPlants,
  setIsReloading,
}) {
  console.log('id: ', id);
  const { handleDialogClose } = useContext(PlantContext);
  const userId = localStorage.getItem('userId');

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
        <Button onClick={handleDialogClose} color='primary'>
          Cancel
        </Button>
        <Button onClick={handleDeletePlant} color='primary'>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
