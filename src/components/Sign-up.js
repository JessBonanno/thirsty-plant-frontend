import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import Input from './Input.js';
import { makeStyles } from '@material-ui/core/styles';
import signUp from './signUp.jpeg';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

// api imports
import useFetch from '../hooks/useFetch';
import { PlantContext } from '../contexts/PlantContext';

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundImage: `url(${signUp})`,
    position: 'fixed',
    minWidth: '100%',
    minHeight: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  buttons: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    justifyItems: 'space-between',
  },
  button: {
    borderRadius: 0,
    width: '100%',
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
}));

function Signup() {
  const history = useHistory();
  const {
    userId,
    setUserId,
    fetchParams,
    setFetchParams,
    response,
    isLoading,
    setIsLoading,
  } = useContext(PlantContext);

  const defaultState = {
    email: '',
    username: '',
    password: '',
    confirm: '',
    phoneNumber: '',
    terms: false,
  };

  const [formState, setFormState] = useState(defaultState);

  // eslint-disable-next-line
  const [postState, setPost] = useState([]);
  const [errors, setErrors] = useState({
    email: '',
    username: '',
    password: '',
    confirm: '',
    phoneNumber: '',
    terms: false,
  });
  const phoneRegex = RegExp(
    /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
  );
  const formSchema = Yup.object().shape({
    email: Yup.string()
      .email('Must be a valid email address.')
      .required('email is required'),
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
    terms: Yup.boolean().oneOf([true], 'Must Accept Terms and Conditions'),
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
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setIsLoading(false);
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
          localStorage.setItem('token', res.data.token);

          history.push('/dashboard');
        })
        .catch(err => console.log(err));
    }
  }, [response]);

  console.log(userId);

  const changeHandler = event => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
    validateChange(event);
  };

  const classes = useStyles();
  return (
    <>
      <div className={classes.form}>
        <Paper>
          <form onSubmit={formSubmit}>
            <Typography variant="h2">Sign Up</Typography>
            <label>
              <Input
                placeholder="Email"
                type="text"
                onChange={changeHandler}
                name="email"
                value={formState.email}
                errors={errors}
              />
            </label>
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
                value={formState.password}
                name="password"
                errors={errors}
              />
            </label>
            <label>
              <Input
                placeholder="Confirm Password"
                type="text"
                onChange={changeHandler}
                value={formState.confirm}
                name="confirm"
                errors={errors}
              />
            </label>
            <Input
              placeholder="Phone Number"
              type="text"
              onChange={changeHandler}
              name="phoneNumber"
              value={formState.phoneNumber}
              errors={errors}
            />
            <label htmlFor="terms">
              <input
                name="terms"
                type="checkbox"
                onChange={changeHandler}
                errors={errors}
              />
              Terms & Conditions
            </label>
            <p>Already have an account?</p>
            <div className={classes.buttons}>
              <Button
                variant="contained"
                color="secondary"
                style={{ color: 'white' }}
                onClick={formSubmit}
                className={classes.button}
              >
                {isLoading ? (
                  <CircularProgress style={{ color: 'white' }} />
                ) : (
                  <Typography variant="button">Sign Up</Typography>
                )}
              </Button>
            </div>
          </form>
        </Paper>
        {/* <pre>{JSON.stringify(postState, null, 2)}</pre> */}
      </div>
    </>
  );
}

export default Signup;
