import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Input from './Input.js';
import axios from 'axios';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import signUp from './signUp.jpeg';
import { CircularProgress } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

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
}));

function Login() {
  const history = useHistory();
  const defaultState = { username: '', password: '' };
  const [formState, setFormState] = useState(defaultState);
  // eslint-disable-next-line
  const [post, setPost] = useState([]);
  const [errors, setErrors] = useState({
    username: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const formSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, 'must include more then 2 characters')
      .required('must include at least 2 characters'),
    password: Yup.string()
      .min(2, 'must include more then 2 characters')
      .required('must include at least 2 characters'),
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
    console.log('test');
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setLoading(true);
    axios
      .post(
        'https://bw-water-my-plants.herokuapp.com/api/users/login',
        formState
      )
      .then(res => {
        localStorage.setItem('token', res.data.token);
        setLoading(false);
        history.push('/dashboard');
      })
      .catch(err => console.log(err));
  };
  console.log({ loading });

  const changeHandler = event => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
    validateChange(event);
  };

  const classes = useStyles();
  return (
    <>
      <div className={classes.form}>
        <form>
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
        </form>
        {/* <pre>{JSON.stringify(post, null, 2)}</pre> */}
      </div>
    </>
  );
}

export default Login;
