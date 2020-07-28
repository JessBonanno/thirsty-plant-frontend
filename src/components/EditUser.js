import React, { useState, useEffect, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Input from './Input.js';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import theme from './ui/Theme';
import { TweenMax, Power3 } from 'gsap';

// Local imports
import { PlantContext } from '../contexts/PlantContext';

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

function EditUser() {
  const history = useHistory();
  const {
    fetchParams,
    setFetchParams,
    response,
    setResponse,
    isLoading,
  } = useContext(PlantContext);
  const classes = useStyles();
  let gsapAnimationChangePass = useRef(null);
  const defaultState = {
    phoneNumber: '',
    password: '',
    newPassword: '',
  };
  const [formState, setFormState] = useState(defaultState);
  const [errors, setErrors] = useState({
    password: '',
    newPassword: '',
    confirmedNewPassword: '',
    phoneNumber: '',
  });
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    setFetchParams({
      method: 'get',
      url: `/users/${userId}`,
    });
  }, []);

  useEffect(() => {
    if (response !== null && response.user) {
      setFormState({
        ...formState,
        phoneNumber: response.user.phoneNumber,
      });
    }
  }, [response]);

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

  const formSubmit = e => {
    e.preventDefault();
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormState({
      ...formState,
      [e.target.name]: value,
    });
    const phoneNumber = formState.phoneNumber.replace(
      /(\d{3})(\d{3})(\d{4})/,
      '($1)-$2-$3'
    );
    setFetchParams({
      method: 'put',
      url: `/users/${userId}`,
      data: {
        phoneNumber: phoneNumber,
        newPassword: formState.newPassword,
        password: formState.password,
      },
    });
    history.push('/dashboard');
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

  return (
    <>
      <Grid container direction="column" className={classes.settingsContainer}>
        <Grid item className={classes.title}>
          <Typography variant="h2" style={{ marginBottom: '1em' }}>
            Account Settings
          </Typography>
          <Grid item className={classes.phoneContainer}>
            <Typography className={classes.inputHelperText} variant="subtitle1">
              Edit Phone Number
            </Typography>
            <Grid container alignItems="center" direction="row">
              <Grid item>
                <TextField
                  className={classes.formField}
                  variant="outlined"
                  name="phoneNumber"
                  label="Phone Number"
                  value={formState.phoneNumber}
                  onChange={changeHandler}
                />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: theme.palette.common.yellow,
                  }}
                  className={classes.button}
                >
                  <Typography variant="button">Save</Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.passwordContainer}>
            <Typography className={classes.inputHelperText} variant="subtitle1">
              Edit Password
            </Typography>

            <Grid container direction="row">
              <Grid item container direction="column">
                <Grid item>
                  {' '}
                  <TextField
                    className={classes.formField}
                    variant="outlined"
                    label="Password"
                    name="password"
                    value={formState.password}
                    onChange={changeHandler}
                  />
                </Grid>
                <Grid item>
                  {' '}
                  <TextField
                    className={classes.formField}
                    variant="outlined"
                    label="New Password"
                    name="newPassword"
                    onChange={changeHandler}
                  />
                </Grid>
                <Grid container alignItems="center" direction="row">
                  <Grid item>
                    <TextField
                      className={classes.formField}
                      variant="outlined"
                      name="confirmedNewPassword"
                      label="Confirm New Password"
                      value={formState.confirmedNewPassword}
                      onChange={changeHandler}
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: theme.palette.common.yellow,
                      }}
                      className={classes.button}
                    >
                      <Typography variant="button">Save</Typography>
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
