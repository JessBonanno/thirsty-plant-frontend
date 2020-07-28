import React, { useState, useEffect, useRef, useContext } from 'react';
import Input from './Input.js';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { TweenMax, Power3 } from 'gsap';

// Local imports
import { PlantContext } from '../contexts/PlantContext';

const useStyles = makeStyles(theme => ({
  signUpContainer: {
    // backgroundImage: `url(${signUp})`,
    position: 'fixed',
    minWidth: '100%',
    height: '100vh',
    overflow: 'auto',
    // minHeight: "100%",
    // backgroundSize: 'cover',
    // backgroundPosition: 'center',
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
    marginLeft: '25px',
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
  },
}));

function EditUser() {
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
    current: '',
    new: '',
    confirm: '',
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

  useEffect(() => {
    TweenMax.to(gsapAnimationChangePass, 1, {
      opacity: 1,
      ease: Power3.easeOut,
    });
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
    confirmCurrentPassword: Yup.string().oneOf(
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

  const back = () => {
    window.history.back();
  };
  return (
    <>
      <div className={classes.signUpContainer}>
        <div
          className={classes.form}
          ref={el => {
            gsapAnimationChangePass = el;
          }}>
          <Paper className={classes.paper}>
            <Typography variant='h4' className={classes.text}>
              Account Settings
            </Typography>
            <form>
              <label>
                <Typography variant='caption'>Phone Number</Typography>
                <Input
                  placeholder={formState.phoneNumber}
                  type='text'
                  onChange={changeHandler}
                  name='phoneNumber'
                  value={formState.phoneNumber}
                  errors={errors}
                />
              </label>
              <label>
                <Typography variant='caption'>New Password</Typography>
                <Input
                  placeholder='New Password'
                  type='text'
                  onChange={changeHandler}
                  name='newPassword'
                  value={formState.newPassword}
                  errors={errors}
                />
              </label>
              <label>
                <Typography variant='caption'>Current Password</Typography>
                <Input
                  placeholder='Password'
                  type='text'
                  onChange={changeHandler}
                  name='password'
                  value={formState.password}
                  errors={errors}
                />
              </label>
              <label>
                <Typography variant='caption'>
                  Confirm Current Password
                </Typography>
                <Input
                  placeholder='Confirm password'
                  type='text'
                  onChange={changeHandler}
                  name='confirmCurrentPassword'
                  value={formState.confirmedPassword}
                  errors={errors}
                />
              </label>

              <div className={classes.buttons}>
                <Button
                  variant='contained'
                  color='secondary'
                  style={{ color: 'white', margin: '20px' }}
                  onClick={formSubmit}>
                  Submit
                </Button>
                <Button
                  variant='contained'
                  color='secondary'
                  style={{ color: 'white' }}
                  onClick={back}>
                  Cancel
                </Button>
              </div>
            </form>
            {/* <pre>{JSON.stringify(post, null, 2)}</pre> */}
          </Paper>
        </div>
      </div>
    </>
  );
}

export default EditUser;
