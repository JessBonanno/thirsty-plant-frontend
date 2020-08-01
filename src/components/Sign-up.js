import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { TweenMax, Power3 } from 'gsap';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import logo from '../assets/images/logo.png';
import theme from './ui/Theme';

// local imports
import Terms from './Terms';
import signUp from '../assets/images/green-gradient-background.svg';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  signUpContainer: {
    backgroundImage: `url(${signUp})`,
    position: 'fixed',
    width: '100%',
    height: '100vh',
    overflow: 'auto',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    paddingBottom: '4em',
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    opacity: '0',
  },
  button: {
    borderRadius: 0,
    color: theme.palette.common.white,
    height: 54,
    width: 150,
    fontSize: '1.8rem',
    marginBottom: 20,
  },
  paper: {
    boxShadow: theme.shadows[5],
    padding: '2em',
    margin: '3em auto',
    width: 350,
    outline: 'none',
    [theme.breakpoints.down('md')]: {
      width: 350,
    },
    [theme.breakpoints.down('sm')]: {
      width: 350,
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      height: '100%',
      margin: 0,
    },
  },
  text: {
    textAlign: 'center',
    marginTop: '25px',
  },
  formGridItem: {
    width: '100%',
    margin: '1em 0',
  },
  errors: {
    fontSize: '1rem',
    color: 'red',
  },
  textInput: {
    boxShadow: theme.shadows[2],
    width: '100%',
  },
}));

function Signup() {
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  let gsapAnimationForm = useRef(null);
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [signInError, setSignInError] = useState('');
  const defaultState = {
    email: '',
    username: '',
    password: '',
    confirm: '',
    phoneNumber: '',
    terms: false,
  };
  const [formState, setFormState] = useState(defaultState);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [errors, setErrors] = useState({
    email: '',
    username: '',
    password: '',
    confirm: '',
    phoneNumber: '',
    terms: '',
  });
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  useEffect(() => {
    TweenMax.to(gsapAnimationForm, 5, {
      opacity: 1,
      ease: Power3.easeOut,
    });
  }, []);

  useEffect(() => {
    if (signInError !== '') {
      setOpenSnackbar(true);
    } else {
      switch (true) {
        case errors.email !== '':
          setOpenSnackbar(true);
          break;
        case errors.username !== '':
          setOpenSnackbar(true);
          break;
        case errors.password !== '':
          setOpenSnackbar(true);
          break;
        case errors.confirm !== '':
          setOpenSnackbar(true);
          break;
        case errors.phoneNumber !== '':
          setOpenSnackbar(true);
          break;
        default:
          setOpenSnackbar(false);
          break;
      }
    }
  }, [errors, signInError]);

  useEffect(() => {
    formSchema.isValid(formState).then(valid => {
      setButtonDisabled(!valid);
    });
  }, [formState]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const snackbar = (
    <div className={classes.root}>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={10000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="error">
          <div style={{ height: '100%', width: 350, zIndex: 3200 }}>
            <div>
              <Typography variant="p">{signInError}</Typography>
            </div>
            <div>
              {' '}
              {errors && <Typography variant="p">{errors.email}</Typography>}
            </div>

            <div>
              {errors && <Typography variant="p">{errors.username}</Typography>}
            </div>
            <div>
              {errors && <Typography variant="p">{errors.password}</Typography>}
            </div>
            <div>
              {errors && (
                <Typography variant="p">{errors.phoneNumber}</Typography>
              )}
            </div>
            <div>
              {errors && <Typography variant="p">{errors.confirm}</Typography>}
            </div>
          </div>
        </Alert>
      </Snackbar>
    </div>
  );

  const phoneRegex = RegExp(
    /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
  );
  const formSchema = Yup.object().shape({
    email: Yup.string()
      .required('Please provide a email.')
      .email('This is not a valid email.'),
    username: Yup.string()
      .min(5, 'must include more then 5 characters')
      .required('must include at least 5 characters'),
    password: Yup.string().matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      'Must one uppercase, one number & be at least 8 characters'
    ),
    confirm: Yup.string().required('Passwords must match'),
    terms: Yup.boolean().oneOf(
      [true],
      'You must accept the terms and conditions'
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

  async function signUp() {
    try {
      const res = await axios.post(
        `https://bw-water-my-plants.herokuapp.com/api/users`,
        formState
      );
      console.log('signup response:', res);
      localStorage.setItem('userId', res.data.newUser.id);
    } catch (err) {
      setLoading(false);
      console.log(err);
      setSignInError('Username or phone number already in use.');
    }
  }

  async function login() {
    try {
      const res = await axios.post(
        'https://bw-water-my-plants.herokuapp.com/api/users/login',
        formState
      );

      console.log('login response:', res);
      localStorage.setItem('token', res.data.token);
      // localStorage.setItem('userId', res.data.user.id);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  const formSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setSignInError('');
    try {
      await signUp();
      await login();
      history.push('/dashboard');
    } catch (err) {
      console.log(err);
    }
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
    <div className={classes.signUpContainer}>
      {snackbar}
      <div
        className={classes.form}
        ref={el => {
          gsapAnimationForm = el;
        }}
      >
        <Paper className={classes.paper}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item>
              <img src={logo} width="40" alt="" />
            </Grid>
            <Grid item>
              <Typography
                variant="h5"
                className={classes.text}
                style={{ marginBottom: '1.5em' }}
              >
                Sign Up
              </Typography>
            </Grid>

            <Grid item style={{ width: '100%' }}>
              <form>
                <Grid container direction="column" style={{ width: '100%' }}>
                  <Grid item className={classes.formGridItem}>
                    <TextField
                      variant="outlined"
                      className={classes.textInput}
                      placeholder="Email"
                      type="text"
                      onChange={changeHandler}
                      name="email"
                      value={formState.email}
                      error={errors.email}
                    />
                  </Grid>
                  <Grid item className={classes.formGridItem}>
                    <TextField
                      variant="outlined"
                      className={classes.textInput}
                      label="Username"
                      placeholder="Username"
                      type="username"
                      onChange={changeHandler}
                      name="username"
                      value={formState.username}
                      error={errors.username}
                    />
                  </Grid>
                  <Grid item className={classes.formGridItem}>
                    <TextField
                      variant="outlined"
                      className={classes.textInput}
                      label="Password"
                      placeholder="Password"
                      type="password"
                      onChange={changeHandler}
                      name="password"
                      value={formState.password}
                      error={errors.password}
                    />
                  </Grid>
                  <Grid item className={classes.formGridItem}>
                    <TextField
                      variant="outlined"
                      className={classes.textInput}
                      label="Confirm Password"
                      placeholder="Confirm Password"
                      type="password"
                      onChange={changeHandler}
                      name="confirm"
                      value={formState.confirm}
                      errors={errors}
                    />
                  </Grid>
                  <Grid item className={classes.formGridItem}>
                    <TextField
                      variant="outlined"
                      className={classes.textInput}
                      label="Phone Number"
                      placeholder="Phone Number"
                      type="tel"
                      onChange={changeHandler}
                      name="phoneNumber"
                      value={formState.phoneNumber}
                      error={errors.phoneNumber}
                    />
                  </Grid>
                  <Grid item>
                    <label htmlFor="terms">
                      <Grid container alignItems="center">
                        <Grid item>
                          <input
                            name="terms"
                            type="checkbox"
                            onChange={changeHandler}
                            errors={errors}
                          />
                        </Grid>
                        <Grid item style={{ width: matchesXS && '95%' }}>
                          <Terms />
                        </Grid>
                      </Grid>
                    </label>
                  </Grid>
                  <Grid item className={classes.formGridItem}>
                    <Button
                      variant="contained"
                      color="secondary"
                      style={{ color: 'white', width: '100%' }}
                      onClick={formSubmit}
                      className={classes.button}
                      disabled={buttonDisabled}
                    >
                      {loading ? (
                        <CircularProgress style={{ color: 'white' }} />
                      ) : (
                        <Typography variant="button">Sign Up</Typography>
                      )}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
            <Grid item>
              <Typography variant="subtitle2">
                Need to{' '}
                <Link
                  to="/login"
                  style={{ color: '#109fff', textDecoration: 'none' }}
                >
                  Log in
                </Link>
                ?
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </div>
  );
}

export default Signup;
