import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

function Input(props) {
  const useStyles = makeStyles(theme => ({
    text: {
      border: '0',
      boxShadow: theme.shadows[2],
      borderRadius: 2,
      padding: '2em',
    },
    errors: {
      fontSize: '1rem',
      color: 'red',
    },
  }));
  const classes = useStyles();
  return (
    <>
      <label htmlFor="name">
        {props.label}
        <input {...props} className={classes.text} />
      </label>
      <div style={{ height: '1em', paddingTop: 5 }}>
        <Typography variant="p" className={classes.errors}>
          {props.errors[props.name]}
        </Typography>
      </div>
    </>
  );
}

export default Input;
