import React, { useState, useEffect, useRef, useContext } from 'react';
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

// api imports
import { PlantContext } from '../contexts/PlantContext';
// local imports
import Terms from './Terms';
import signUp from '../assets/images/green-gradient-background.svg';
import Input from './Input.js';

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
    minWidth: '100%',
    height: '100vh',
    overflow: 'auto',
    // minHeight: "100%",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    // padding: '1em 0',
    paddingBottom: '5em',
  },
  form: {
    // marginTop: '3em',
    display: 'flex',
    justifyContent: 'center',
    opacity: '0',
  },
  // form2: {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   justifyContent: 'center',
  //   paddingBottom: '25px',
  // },
  button: {
    borderRadius: 0,
    color: theme.palette.common.white,
    height: 54,
    width: 150,
    fontSize: '1.8rem',
    marginBottom: 20,
  },
  // buttons: {
  //   width: '100%',
  //   display: 'flex',
  //   justifyContent: 'center',
  //   marginTop: '20px',
  // },
  // buttons2: {
  //   width: '100%',
  //   display: 'flex',
  //   justifyContent: 'center',
  //   marginTop: '20px',
  // },
  paper: {
    // backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: '2em',
    margin: '3em auto',
    width: 350,
    // height: 800,
    outline: 'none',
    [theme.breakpoints.down('md')]: {
      // height: 500,
      width: 350,
      // padding: 20,
    },
    [theme.breakpoints.down('sm')]: {
      // height: 500,
      width: 350,
      // padding: 20,
    },
    [theme.breakpoints.down('xs')]: {
      // height: 500,
      width: 350,
      margin: 0,
      // padding: 20,
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
  const classes = useStyles();
  let gsapAnimationForm = useRef(null);
  const history = useHistory();
  const {
    setUserId,
    fetchParams,
    setFetchParams,
    response,
    error,
  } = useContext(PlantContext);
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
  // eslint-disable-next-line
  const [postState, setPost] = useState([]);
  const [errors, setErrors] = useState({
    email: '',
    username: '',
    password: '',
    confirm: '',
    phoneNumber: '',
    terms: '',
  });

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleClick = () => {
    setOpenSnackbar(true);
  };

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

  const formSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setSignInError('');

    axios
      .post(`https://bw-water-my-plants.herokuapp.com/api/users`, formState)
      .then(res => {
        setUserId(res.id);
        console.log(res);
        axios
          .post(
            'https://bw-water-my-plants.herokuapp.com/api/users/login',
            formState
          )
          .then(res => {
            console.log(res);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userId', res.data.user.id);
            setLoggedIn(true);
          })
          .catch(err => {
            setLoading(false);
            console.log(err);
          });
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
        setSignInError('Username or phone number already in use.');
      });
  };

  // useEffect(() => {
  //   setSignUpLoading(false);
  // }, []);

  // const [token, setToken] = useState('');

  useEffect(() => {
    if (loggedIn) {
      history.push('/dashboard');
    }
  }, [loggedIn]);

  useEffect(() => {
    TweenMax.to(gsapAnimationForm, 5, {
      opacity: 1,
      ease: Power3.easeOut,
    });
  }, []);

  const changeHandler = e => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormState({
      ...formState,
      [e.target.name]: value,
    });
    validateChange(e);
  };

  useEffect(() => {
    formSchema.isValid(formState).then(valid => {
      setButtonDisabled(!valid);
    });
  }, [formState]);

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
            // style={{ border: '1px solid red' }}
          >
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
                    {/* {errors && (
                      <div style={{ height: '1em', paddingTop: 5 }}>
                        <Typography
                          variant="caption"
                          className={classes.errors}
                        >
                          {errors.email}
                        </Typography>
                      </div>
                    )} */}
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
                    {/* {errors && (
                      <div style={{ height: '1em', paddingTop: 5 }}>
                        <Typography
                          variant="caption"
                          className={classes.errors}
                        >
                          {errors.username}
                        </Typography>
                      </div>
                    )} */}
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
                    {/* {errors && (
                      <div style={{ height: '1em', paddingTop: 5 }}>
                        <Typography
                          variant="caption"
                          className={classes.errors}
                        >
                          {errors.password}
                        </Typography>
                      </div>
                    )} */}
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
                    {/* {errors && (
                      <div style={{ height: '1em', paddingTop: 5 }}>
                        <Typography
                          variant="caption"
                          className={classes.errors}
                        >
                          {errors.confirm}
                        </Typography>
                      </div>
                    )} */}
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
                    {/* {errors && (
                      <div style={{ height: '1em', paddingTop: 5 }}>
                        <Typography
                          variant="caption"
                          className={classes.errors}
                        >
                          {errors.phoneNumber}
                        </Typography>
                      </div>
                    )} */}
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
                        <Grid item>
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
    // <div className={classes.signUpContainer}>
    //   <div
    //     className={classes.form}
    //     ref={el => {
    //       gsapAnimationForm = el;
    //     }}
    //   >
    //     <Paper className={classes.paper}>
    //       <form onSubmit={formSubmit}>
    //         <Typography variant="h2" className={classes.text}>
    //           Sign Up
    //         </Typography>
    //         <label>
    //           <Input
    //             placeholder="Email"
    //             type="text"
    //             onChange={changeHandler}
    //             name="email"
    //             value={formState.email}
    //             errors={errors}
    //           />
    //         </label>
    //         <label>
    //           <Input
    //             placeholder="Username"
    //             type="text"
    //             onChange={changeHandler}
    //             name="username"
    //             value={formState.username}
    //             errors={errors}
    //           />
    //         </label>
    //         <label>
    //           <Input
    //             placeholder="Password"
    //             type="text"
    //             onChange={changeHandler}
    //             value={formState.password}
    //             name="password"
    //             errors={errors}
    //           />
    //         </label>
    //         <label>
    //           <Input
    //             placeholder="Confirm Password"
    //             type="text"
    //             onChange={changeHandler}
    //             value={formState.confirm}
    //             name="confirm"
    //             errors={errors}
    //           />
    //         </label>
    //         <Input
    //           placeholder="Phone Number"
    //           type="text"
    //           onChange={changeHandler}
    //           name="phoneNumber"
    //           value={formState.phoneNumber}
    //           errors={errors}
    //         />
    //         <br />
    //         <label htmlFor="terms">
    //           <Grid container alignItems="center">
    //             <Grid item>
    //               <input
    //                 name="terms"
    //                 type="checkbox"
    //                 onChange={changeHandler}
    //                 errors={errors}
    //               />
    //             </Grid>
    //             <Grid item>
    //               <Terms />
    //             </Grid>
    //           </Grid>
    //         </label>
    //         <div className={classes.buttons}>
    //           <Button
    //             disabled={buttonDisabled}
    //             variant="contained"
    //             color="secondary"
    //             style={{ color: 'white' }}
    //             onClick={formSubmit}
    //             className={classes.button}
    //           >
    //             {signUpLoading ? (
    //               <CircularProgress style={{ color: 'white' }} />
    //             ) : (
    //               <Typography variant="button">Sign Up</Typography>
    //             )}
    //           </Button>
    //         </div>
    //         <Typography variant="h6" className={classes.text}>
    //           Already have an account?{' '}
    //           <Button
    //             variant="contained"
    //             color="secondary"
    //             style={{ color: 'white' }}
    //             component={Link}
    //             to="/login"
    //           >
    //             Login
    //           </Button>
    //         </Typography>
    //       </form>
    //     </Paper>
    //   </div>
    // </div>
  );
}

export default Signup;
