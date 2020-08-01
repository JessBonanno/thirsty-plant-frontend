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
  const [details, setDetails] = useState([]);
  const [finding, setFinding] = useState(false);
  const [editing, setEditing] = useState(false);

  let image;

  const getDetails = async e => {
    e.preventDefault();

    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64 = reader.result;
      const data = {
        api_key: 'ZtqRxsEZKiqQUTQIKlDllMfN2qpMbsK678l28YscBKNuE54JW8',
        images: [base64],
        modifiers: ['crops_fast', 'similar_images'],
        plant_language: 'en',
        plant_details: [
          'common_names',
          'url',
          'name_authority',
          'wiki_description',
          'taxonomy',
          'synonyms',
          'species',
        ],
      };

      fetch('https://api.plant.id/v2/identify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          setDetails(data.suggestions);
          console.log(base64);
          setFinding(false);
        })
        .catch(error => {
          console.error('Error:', error);
          setFinding(false);
        });
    };
  };

  async function classifyPlant(e) {
    await getDetails(e);
  }

  const handleUpload = async e => {
    setUploading(true);
    console.log('test:');
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

  const handleEditModalClose = () => {
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
        finding,
        setFinding,
        setDrawerOpen,
        imageUrl,
        setImageUrl,
        handleUpload,
        uploading,
        setUploading,
        handleAddModalClose,
        handleAddModalOpen,
        addModalOpen,
        setAddModalOpen,
        dialogOpen,
        setDialogOpen,
        handleEditModalClose,
        handleEditModalOpen,
        userId,
        setUserId,
        submitted,
        setSubmitted,
        classifyPlant,
        getDetails,
        setDetails,
        details,
        editing,
        setEditing,
      }}
    >
      {children}
    </PlantContext.Provider>
  );
};
