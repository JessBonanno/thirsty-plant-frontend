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
  const [dialogOpen, setDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userId, setUserId] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [uploading, setUploading] = useState(false);

  let image;
  const handleUpload = async e => {
    setUploading(true);
    image = e.target.files[0];
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'wpnbbzl6');
    data.append('api_key', '925249979199193');

    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/wpnbbzl6/image/upload`,
      data
    );

    setImageUrl(res.data.url);
    setUploading(false);
  };
  const handleAddModalClose = () => {
    setAddModalOpen(false);
  };
  const handleAddModalOpen = () => {
    setAddModalOpen(true);
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
        uploading,
        handleAddModalClose,
        handleAddModalOpen,
        addModalOpen,
        setAddModalOpen,
        dialogOpen,
        setDialogOpen,
        editModalOpen,
        setEditModalOpen,
        handleEdiModalClose,
        handleEditModalOpen,
        userId,
        setUserId,
        submitted,
        setSubmitted,
      }}
    >
      {children}
    </PlantContext.Provider>
  );
};
