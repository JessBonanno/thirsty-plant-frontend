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

// transition function from material ui
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

/**
 * Component for handling user plant deletion
 *
 * @export
 * @param {number} id the id of the plant to be deleted
 * @param {boolean} dialogOpen the state of the delete dialog
 * @returns {jsx}
 */

export default function DeleteDialog({ id }) {
  console.log('id: ', id);
  const {
    fetchParams,
    setFetchParams,
    dialogOpen,
    setDialogOpen,
    handleDialogClose,
  } = useContext(PlantContext);

  const handleDeletePlant = e => {
    e.preventDefault();
    setFetchParams({
      ...fetchParams,
      // temporary fake url until we get the endpoint from backend
      url: `/plants/${id}`,
      method: 'delete',
    });
    setDialogOpen(false);
  };
  return (
    <Dialog
      open={dialogOpen}
      BackdropProps={{ style: { opacity: '0.5' } }}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleDialogClose}
      aria-labelledby="delete-plant-dialog"
      aria-describedby="delete-plant-dialog"
    >
      <DialogTitle id="dialog-title">{"Don't kale my vibe!"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="dialog-description">
          Are you sure you want to delete this plant?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleDeletePlant} color="primary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
