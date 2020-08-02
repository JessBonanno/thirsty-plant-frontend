import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { CircularProgress } from '@material-ui/core';
import theme from './ui/Theme';
// local imports
import { axiosWithAuth } from '../utils/axiosWithAuth';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const useStyles = makeStyles(theme => ({
  button: {
    borderRadius: 0,
    color: theme.palette.common.white,
    height: 54,
    width: 150,
    fontSize: '1.8rem',
    marginBottom: 20,
  },
  formField: {
    width: '250px',
    marginRight: '20px',
    marginBottom: 20,
  },
  inputHelperText: {
    marginBottom: 10,
  },
  settingsContainer: {
    padding: '5em',
  },
}));
const defaultState = {
  phoneNumber: '',
  password: '',
  newPassword: '',
};
function EditUser() {
  const classes = useStyles();
  const userId = localStorage.getItem('userId');
  const [phoneSaveLoading, setPhoneSaveLoading] = useState(false);
  const [passwordSaveLoading, setPasswordSaveLoading] = useState(false);
  const [openPhoneSnackbar, setOpenPhoneSnackbar] = useState(false);
  const [openPasswordSnackbar, setOpenPasswordSnackbar] = useState(false);
  const [formState, setFormState] = useState(defaultState);
  const [errors, setErrors] = useState({
    password: '',
    newPassword: '',
    confirmedNewPassword: '',
    phoneNumber: '',
  });

  async function getUser() {
    try {
      const res = await axiosWithAuth().get(
        `https://bw-water-my-plants.herokuapp.com/api/users/${userId}`
      );
      setFormState({
        ...defaultState,
        phoneNumber: res.data.user.phoneNumber,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const phoneRegex = RegExp(
    /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
  );

  const formSchema = Yup.object().shape({
    password: Yup.string().required('Please enter your current password'),
    newPassword: Yup.string().matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      'Must include one lowercase, one uppercase, one number & be at least 8 characters in length'
    ),
    confirmedNewPassword: Yup.string().oneOf(
      [Yup.ref('new'), null],
      'Passwords must match'
    ),
    phoneNumber: Yup.string()
      .matches(phoneRegex, 'Invalid phone')
      .required('Phone is required'),
  });

  const validateChange = e => {
    e.persist();
    Yup.reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then(valid =>
        setErrors({
          ...errors,
          [e.target.name]: '',
        })
      )
      .catch(error =>
        setErrors({
          ...errors,
          [e.target.name]: error.errors[0],
        })
      );
  };
  const changeHandler = e => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormState({
      ...formState,
      [e.target.name]: value,
    });
    validateChange(e);
  };

  async function editPhone() {
    setPhoneSaveLoading(true);
    const phoneNumber = formState.phoneNumber.replace(
      /(\d{3})(\d{3})(\d{4})/,
      '($1)-$2-$3'
    );
    setPhoneSaveLoading(true);
    try {
      const res = await axiosWithAuth().put(
        `https://bw-water-my-plants.herokuapp.com/api/users/${userId}`,
        {
          phoneNumber: phoneNumber,
        }
      );
      setFormState({
        ...defaultState,
        phoneNumber: res.data.user.phoneNumber,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  async function phoneSubmit(e) {
    e.preventDefault();
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormState({
      ...formState,
      [e.target.name]: value,
    });

    try {
      await editPhone();
      setOpenPhoneSnackbar(true);
      setPhoneSaveLoading(false);
    } catch (err) {
      console.log(err);
    }
  }
  async function editPassword() {
    setPasswordSaveLoading(true);

    try {
      const res = await axiosWithAuth().put(
        `https://bw-water-my-plants.herokuapp.com/api/users/${userId}`,
        {
          newPassword: formState.newPassword,
          password: formState.password,
        }
      );
      setFormState({
        ...defaultState,
        phoneNumber: res.data.user.phoneNumber,
      });

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }
  async function passwordSubmit(e) {
    e.preventDefault();
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormState({
      ...formState,
      [e.target.name]: value,
    });
    try {
      await editPassword();
      setPasswordSaveLoading(false);
      setOpenPasswordSnackbar(true);
    } catch (err) {
      console.log(err);
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenPasswordSnackbar(false);
    setOpenPhoneSnackbar(false);
  };

  const passwordSnackbar = (
    <div className={classes.root}>
      <Snackbar
        open={openPasswordSnackbar}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity='success'>
          <div style={{ height: '100%', width: 350, zIndex: 3200 }}>
            <Typography variant='p'>Password changed successfully</Typography>
          </div>
        </Alert>
      </Snackbar>
    </div>
  );

  const phoneSnackbar = (
    <div className={classes.root}>
      <Snackbar
        open={openPhoneSnackbar}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity='success'>
          <div style={{ height: '100%', width: 350, zIndex: 3200 }}>
            <Typography variant='p'>
              Phone number changed successfully
            </Typography>
          </div>
        </Alert>
      </Snackbar>
    </div>
  );

  return (
    <>
      {phoneSnackbar}
      {passwordSnackbar}
      <Grid container direction='column' className={classes.settingsContainer}>
        <Grid item className={classes.title}>
          <Typography variant='h2' style={{ marginBottom: '1em' }}>
            Account Settings
          </Typography>
          <Grid item className={classes.phoneContainer}>
            <Typography className={classes.inputHelperText} variant='subtitle1'>
              Edit Phone Number
            </Typography>
            <Grid container alignItems='center' direction='row'>
              <Grid item>
                <TextField
                  className={classes.formField}
                  variant='outlined'
                  name='phoneNumber'
                  label='Phone Number'
                  value={formState.phoneNumber}
                  onChange={changeHandler}
                />
              </Grid>
              <Grid item>
                <Button
                  variant='contained'
                  style={{
                    backgroundColor: theme.palette.common.yellow,
                  }}
                  className={classes.button}
                  onClick={phoneSubmit}>
                  {phoneSaveLoading ? (
                    <CircularProgress style={{ color: 'white' }} />
                  ) : (
                    <Typography variant='button'>Save</Typography>
                  )}
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.passwordContainer}>
            <Typography className={classes.inputHelperText} variant='subtitle1'>
              Edit Password
            </Typography>

            <Grid container direction='row'>
              <Grid item container direction='column'>
                <Grid item>
                  {' '}
                  <TextField
                    className={classes.formField}
                    variant='outlined'
                    label='Password'
                    name='password'
                    type='password'
                    value={formState.password}
                    onChange={changeHandler}
                  />
                </Grid>
                <Grid item>
                  {' '}
                  <TextField
                    className={classes.formField}
                    variant='outlined'
                    label='New Password'
                    name='newPassword'
                    type='password'
                    value={formState.newPassword}
                    onChange={changeHandler}
                  />
                </Grid>
                <Grid container alignItems='center' direction='row'>
                  <Grid item>
                    <TextField
                      className={classes.formField}
                      variant='outlined'
                      name='confirmedNewPassword'
                      label='Confirm New Password'
                      type='password'
                      value={formState.confirmedNewPassword}
                      onChange={changeHandler}
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      variant='contained'
                      style={{
                        backgroundColor: theme.palette.common.yellow,
                      }}
                      className={classes.button}
                      onClick={passwordSubmit}>
                      {passwordSaveLoading ? (
                        <CircularProgress style={{ color: 'white' }} />
                      ) : (
                        <Typography variant='button'>Save</Typography>
                      )}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default EditUser;
