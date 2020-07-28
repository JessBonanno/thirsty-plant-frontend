import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Input from './Input.js';
import axios from 'axios';
import * as Yup from 'yup';
// eslint-disable-next-line
import theme from '../components/ui/Theme';
// eslint-disable-next-line
import Typography from '@material-ui/core/Typography';
// eslint-disable-next-line
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
// eslint-disable-next-line
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import signUp from './signUp.jpeg';
import GradientBackground from '../assets/images/green-gradient-background.svg';
import PlantBackgroundImg from '../assets/images/plant-background.png';
import Paper from '@material-ui/core/Paper';
import { PlantContext } from '../contexts/PlantContext';
import { CircularProgress } from '@material-ui/core';
import { TweenMax, Power3 } from 'gsap';

const useStyles = makeStyles(theme => ({
  signUpContainer: {
    backgroundImage: `url(${PlantBackgroundImg}), url(${GradientBackground})`,
    backgroundPosition: 'left top, center right',
    backgroundRepeat: 'no-repeat, no-repeat',
    backgroundSize: 'contain, cover',
    backgroundAttachment: 'fixed, fixed',
    // position: 'fixed',
    minWidth: '100%',
    height: '100vh',
    // backgroundSize: 'contain',
    // backgroundPosition: 'center',
    // display: 'flex',
    // justifyContent: 'center',
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
    margin: '7em auto',
    width: 250,
    height: 440,
    outline: 'none',
    [theme.breakpoints.down('md')]: {
      height: 500,
      width: 350,
      // padding: 20,
    },
    [theme.breakpoints.down('sm')]: {
      height: 500,
      width: '70 %',
      // padding: 20,
    },
    [theme.breakpoints.down('xs')]: {
      height: 500,
      width: 355,
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

function Login() {
  const { setUserId } = useContext(PlantContext);

  const history = useHistory();
  const classes = useStyles();
  let gsapAnimationLogin = useRef(null);

  const defaultState = { username: '', password: '' };
  const [formState, setFormState] = useState(defaultState);
  // eslint-disable-next-line
  const [post, setPost] = useState([]);
  const [errors, setErrors] = useState({
    username: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const formSchema = Yup.object().shape({
    username: Yup.string().required('username is required'),
    password: Yup.string().required('password is required'),
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
    setLoading(true);
    axios
      .post(
        'https://bw-water-my-plants.herokuapp.com/api/users/login',
        formState
      )
      .then(res => {
        console.log('login response:', res);
        localStorage.setItem('token', res.data.token);
        setUserId(res.data.user.id);
        localStorage.setItem('userId', res.data.user.id);
        setLoading(false);
        history.push('/dashboard');
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
        if (err) {
          setLoginError(true);
        }
      });
  };

  const changeHandler = e => {
    setLoginError(false);

    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormState({
      ...formState,
      [e.target.name]: value,
    });
    validateChange(e);
  };

  useEffect(() => {
    TweenMax.to(gsapAnimationLogin, 2, {
      opacity: 1,
      ease: Power3.easeOut,
    });
  }, []);
  return (
    <>
      <div className={classes.signUpContainer}>
        <div
          className={classes.form}
          ref={el => {
            gsapAnimationLogin = el;
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
                  Sign In
                </Typography>
                {loginError && (
                  <Typography variant="caption">
                    Username and password not recognized, please try again
                  </Typography>
                )}
              </Grid>

              <Grid item style={{ width: '100%' }}>
                <form>
                  <Grid container direction="column" style={{ width: '100%' }}>
                    <Grid item className={classes.formGridItem}>
                      <TextField
                        variant="outlined"
                        className={classes.textInput}
                        placeholder="Username"
                        type="text"
                        onChange={changeHandler}
                        name="username"
                        value={formState.username}
                        errors={errors}
                      />
                      {errors && (
                        <div style={{ height: '1em', paddingTop: 5 }}>
                          <Typography
                            variant="caption"
                            className={classes.errors}
                          >
                            {errors.username}
                          </Typography>
                        </div>
                      )}
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
                        errors={errors}
                      />
                      {errors && (
                        <div style={{ height: '1em', paddingTop: 5 }}>
                          <Typography
                            variant="caption"
                            className={classes.errors}
                          >
                            {errors.password}
                          </Typography>
                        </div>
                      )}
                    </Grid>

                    <Grid item className={classes.formGridItem}>
                      <Button
                        variant="contained"
                        color="secondary"
                        style={{ color: 'white', width: '100%' }}
                        onClick={formSubmit}
                        className={classes.button}
                      >
                        {loading ? (
                          <CircularProgress style={{ color: 'white' }} />
                        ) : (
                          <Typography variant="button" onClick={formSubmit}>
                            Login
                          </Typography>
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
                    to="/signup"
                    style={{ color: '#109fff', textDecoration: 'none' }}
                  >
                    Signup
                  </Link>
                  ?
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </div>
        {/* <div
          className={classes.form}
          ref={el => {
            gsapAnimationLogin = el;
          }}
        >
          <Paper className={classes.paper}>
            <form className={classes.form2}>
              <Typography variant="h2" className={classes.text}>
                Log In
              </Typography>
              {loginError && (
                <Typography variant="caption" style={{ color: 'red' }}>
                  Username and password not recognized, please try again
                </Typography>
              )}
              <label>
                <Input
                  placeholder="Username"
                  type="text"
                  onChange={changeHandler}
                  name="username"
                  value={formState.username}
                  errors={errors}
                />
              </label>
              <label>
                <Input
                  placeholder="Password"
                  type="text"
                  onChange={changeHandler}
                  name="password"
                  value={formState.password}
                  errors={errors}
                />
              </label>
              <div className={classes.buttons}>
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ color: 'white' }}
                  onClick={formSubmit}
                  className={classes.button}
                >
                  {loading ? (
                    <CircularProgress style={{ color: 'white' }} />
                  ) : (
                    <Typography variant="button" onClick={formSubmit}>
                      Login
                    </Typography>
                  )}
                </Button>
              </div>
              <Typography variant="h6" className={classes.text}>
                Dont have an account?{' '}
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ color: 'white' }}
                  component={Link}
                  to="/signup"
                >
                  Sign Up
                </Button>
              </Typography>
            </form>
          </Paper>
                  </div> */}
      </div>
    </>
  );
}

export default Login;
