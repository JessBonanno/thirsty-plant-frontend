import React, { createContext, useState } from 'react';
import theme from '../components/ui/Theme';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import axios from 'axios';

export const PlantContext = createContext({});

export const PlantProvider = ({ children }) => {
  // material breakpoints
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
  const matchesLG = useMediaQuery(theme.breakpoints.down('lg'));

  const [imageUrl, setImageUrl] = useState('');
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [dialogOpen, setDialogOpen] = useState();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userId, setUserId] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  let image;
  const handleUpload = async e => {
    image = e.target.files[0];
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'wpnbbzl6');
    data.append('api_key', '925249979199193');

    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/wpnbbzl6/image/upload`,
      data
    );

    const file = await res;
    setImageUrl(res.data.url);
  };
  const handleAddModalClose = () => {
    setAddModalOpen(false);
  };
  const handleAddModalOpen = () => {
    setAddModalOpen(true);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  const handleEditModalOpen = () => {
    setEditModalOpen(true);
  };

  const handleEdiModalClose = () => {
    setEditModalOpen(false);
  };

  return (
    <PlantContext.Provider
      value={{
        matchesXS,
        matchesSM,
        matchesMD,
        matchesLG,
        drawerOpen,
        setDrawerOpen,
        imageUrl,
        setImageUrl,
        handleUpload,
        handleAddModalClose,
        handleAddModalOpen,
        addModalOpen,
        setAddModalOpen,
        handleDialogClose,
        dialogOpen,
        setDialogOpen,
        editModalOpen,
        setEditModalOpen,
        handleEdiModalClose,
        handleEditModalOpen,
        handleDialogOpen,
        userId,
        setUserId,
        submitted,
        setSubmitted,
      }}>
      {children}
    </PlantContext.Provider>
  );
};
