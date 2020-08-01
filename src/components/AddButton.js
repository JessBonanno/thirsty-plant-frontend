import React, { useContext } from 'react';
import './AddButton.css';
import theme from './ui/Theme';
import { PlantContext } from '../contexts/PlantContext';

const AddButton = props => {
  const { addModalOpen, editModalOpen } = useContext(PlantContext);

  const { handleAddModalOpen } = props;
  return (
    <div
      className="add-button-background bg-red-400 p-2"
      style={{
        padding: '0.5rem',
        backgroundColor: theme.palette.common.yellow,
        zIndex: 3200,
        display: addModalOpen || editModalOpen ? 'none' : undefined,
      }}
      onClick={handleAddModalOpen}
    >
      <div
        className="add-button w-8 h-8"
        style={{ width: '2rem', height: '2rem' }}
      ></div>
    </div>
  );
};

export default AddButton;
