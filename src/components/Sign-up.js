import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { TweenMax, Power3 } from 'gsap';

// api imports
import { PlantContext } from '../contexts/PlantContext';
// local imports
import Terms from './Terms';
import signUp from './signUp.jpeg';
import Input from './Input.js';

const useStyles = makeStyles(theme => ({
  signUpContainer: {
    backgroundImage: `url(${signUp})`,
    position: 'fixed',
    minWidth: '100%',
    height: '100vh',
    // minHeight: "100%",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  form: {
    marginTop: '3em',
    display: 'flex',
    justifyContent: 'center',
    opacity: '0',
  },
  buttons: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    justifyItems: 'space-between',
    marginLeft: '0px',
    marginBottom: '20px',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    padding: '25px',
    boxShadow: theme.shadows[5],
    width: 654,
    outline: 'none',
    [theme.breakpoints.down('sm')]: {
      height: 625,
      width: 400,
      padding: 20,
    },
  },
  text: {
    textAlign: 'center',
    marginBottom: '.25em',
  },
}));

function Signup() {
  let gsapAnimationForm = useRef(null);
  const history = useHistory();
  const { setUserId, fetchParams, setFetchParams, response } = useContext(
    PlantContext
  );
  const [signUpLoading, setSignUpLoading] = useState(false);

  const defaultState = {
    email: '',
    username: '',
    password: '',
    confirm: '',
    phoneNumber: '',
    terms: false,
  };
  const [formState, setFormState] = useState(defaultState);

  const [buttonDisabled, setButtonDisabled] = useState(false);
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
      'Must include one lowercase, one uppercase, one number & be at least 8 characters in length'
    ),
    confirm: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Passwords must match'
    ),
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
    setSignUpLoading(true);

    try {
      const value =
        e.target.type === 'checkbox' ? e.target.checked : e.target.value;
      setFormState({
        ...formState,
        [e.target.name]: value,
      });
      // const post = setPost({
      //   ...postState,
      //   formState,
      // });
      setFetchParams({
        ...fetchParams,
        method: 'post',
        url: '/users',
        data: formState,
      });
      setSignUpLoading(false);
    } catch (err) {
      console.log(err);
      setSignUpLoading(false);
    }
  };

  // useEffect(() => {
  //   setSignUpLoading(false);
  // }, []);

  useEffect(() => {
    TweenMax.to(gsapAnimationForm, 5, {
      opacity: 1,
      ease: Power3.easeOut,
    });
  }, []);

  useEffect(() => {
    if (response !== null) {
      setUserId(response.id);
      axios
        .post(
          'https://bw-water-my-plants.herokuapp.com/api/users/login',
          formState
        )
        .then(res => {
          console.log(res);
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('userId', res.data.user.id);

          history.push('/dashboard');
        })
        .catch(err => console.log(err));
    }
  }, [response]);

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

  const classes = useStyles();
  return (
    <div className={classes.signUpContainer}>
      <div
        className={classes.form}
        ref={el => {
          gsapAnimationForm = el;
        }}>
        <Paper className={classes.paper}>
          <form onSubmit={formSubmit}>
            <Typography variant='h2' className={classes.text}>
              Sign Up
            </Typography>
            <label>
              <Input
                placeholder='Email'
                type='text'
                onChange={changeHandler}
                name='email'
                value={formState.email}
                errors={errors}
              />
            </label>
            <label>
              <Input
                placeholder='Username'
                type='text'
                onChange={changeHandler}
                name='username'
                value={formState.username}
                errors={errors}
              />
            </label>
            <label>
              <Input
                placeholder='Password'
                type='text'
                onChange={changeHandler}
                value={formState.password}
                name='password'
                errors={errors}
              />
            </label>
            <label>
              <Input
                placeholder='Confirm Password'
                type='text'
                onChange={changeHandler}
                value={formState.confirm}
                name='confirm'
                errors={errors}
              />
            </label>
            <Input
              placeholder='Phone Number'
              type='text'
              onChange={changeHandler}
              name='phoneNumber'
              value={formState.phoneNumber}
              errors={errors}
            />
            <br />
            <label htmlFor='terms'>
              <Grid container alignItems='center'>
                <Grid item>
                  <input
                    name='terms'
                    type='checkbox'
                    onChange={changeHandler}
                    errors={errors}
                  />
                </Grid>
                <Grid item>
                  <Terms />
                </Grid>
              </Grid>
            </label>
            <div className={classes.buttons}>
              <Button
                variant='contained'
                color='secondary'
                style={{ color: 'white' }}
                onClick={formSubmit}
                className={classes.button}>
                {signUpLoading ? (
                  <CircularProgress style={{ color: 'white' }} />
                ) : (
                  <Typography variant='button'>Sign Up</Typography>
                )}
              </Button>
            </div>
            <Typography variant='h6' className={classes.text}>
              Already have an account?{' '}
              <Button
                variant='contained'
                color='secondary'
                style={{ color: 'white' }}
                component={Link}
                to='/login'>
                Login
              </Button>
            </Typography>
          </form>
        </Paper>
      </div>
    </div>
  );
}

export default Signup;
