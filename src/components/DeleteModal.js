import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { Grid, Typography } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

// api imports
import { axiosWithAuth } from '../utils/axiosWithAuth';
import useFetch from '../hooks/useFetch';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function DeleteModal({ plantId }) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [fetchParams, setFetchParams] = useState({
    method: '',
    url: '',
    data: '',
  });
  const { response, isLoading } = useFetch({
    api: axiosWithAuth(),
    method: fetchParams.method,
    url: fetchParams.url,
    data: fetchParams.data,
  });
  console.log(response);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeletePlant = e => {
    e.preventDefault();
    setFetchParams({
      ...fetchParams,
      // temporary fake url until we get the endpoint from backend
      url: `/api/plants/${plantId}`,
      method: 'delete',
    });
    setOpen(false);
  };

  const body = (
    <Grid container direction='column' alignItems='center' justify='center'>
      <Grid item style={{ margin: '1em' }}>
        <Typography variant='h4'>Don't kale my vibe!</Typography>
      </Grid>
      <Grid item style={{ margin: '1em' }}>
        <Typography variant='subtitle1'>
          {' '}
          Are you sure you want to delete this plant?
        </Typography>
      </Grid>
      <Grid container justify='space-evenly'>
        <Grid item>
          <Button variant='contained' color='primary' onClick={handleClose}>
            Cancel
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant='contained'
            color='primary'
            onClick={handleDeletePlant}>
            Delete
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );

  return (
    <div>
      <Button variant='contained' color='primary' onClick={handleOpen}>
        Open Modal
      </Button>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={open}>
          <div className={classes.paper}>{body}</div>
        </Fade>
      </Modal>
    </div>
  );
}
