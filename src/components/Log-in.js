import React, { useState } from 'react';
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
import Paper from '@material-ui/core/Paper';
import { CircularProgress } from '@material-ui/core';

import ChangePass from './ChangePass.js';
import Signup from './Sign-up.js';

const useStyles = makeStyles(theme => ({
  signUpContainer: {
    backgroundImage: `url(${signUp})`,
    position: 'fixed',
    minWidth: '100%',
    height: '100vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  form: {
    marginTop: '3em',
  },
  form2: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    border: '2px solid black',
    paddingBottom: '25px',
  },
  buttons: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  buttons2: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: '70px',
    width: 654,
    height: 500,
    outline: 'none',
    [theme.breakpoints.down('sm')]: {
      height: 550,
      width: 400,
      padding: 20,
    },
  },
  text: {
    textAlign: 'center',
    marginTop: '25px',
  },
}));

function Login() {
  const history = useHistory();
  const classes = useStyles();

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
    password: Yup.string().required('username is required'),
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
    setLoading(true);
    axios
      .post(
        'https://bw-water-my-plants.herokuapp.com/api/users/login',
        formState
      )
      .then(res => {
        console.log('login response:', res);
        localStorage.setItem('token', res.data.token);
        setLoading(false);
        history.push('/dashboard');
      })
      .catch(err => {
        console.log(err);
        if (err) {
          setLoginError(true);
        }
      });

    setLoading(false);
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

  return (
    <div className={classes.signUpContainer}>
      <div className={classes.form}>
        <Paper className={classes.paper}>
          <form onSubmit={formSubmit} className={classes.form2}>
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
                  <Typography variant="button">Login</Typography>
                )}
              </Button>
            </div>
            <Typography variant="h6" className={classes.text}>
              Dont have an account?{' '}
              <Button
                variant="contained"
                color="secondary"
                style={{ color: 'white' }}
                href={Signup}
                onClick={history.push('/signup')}
              >
                Sign Up
              </Button>
            </Typography>
          </form>
        </Paper>
      </div>
    </div>
  );
}

export default Login;
