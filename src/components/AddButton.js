import React from 'react';
import './AddButton.css';
import { makeStyles } from '@material-ui/styles';
import theme from './ui/Theme';

const useStyles = makeStyles(theme => ({}));

const AddButton = () => {
  return (
    <div
      className="add-button-background bg-red-400 p-2"
      style={{
        padding: '0.5rem',
        backgroundColor: theme.palette.common.yellow,
        zIndex: 3200,
      }}
    >
      <div
        className="add-button w-8 h-8"
        style={{ width: '2rem', height: '2rem' }}
      ></div>
    </div>
  );
};

export default AddButton;
