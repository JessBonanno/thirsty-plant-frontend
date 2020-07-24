import axios from 'axios';

/**
 * Component to handle authorized api requests with token
 *
 * @returns {object} an object with api properties for axios
 */
export const axiosWithAuth = () => {
  //  get the token from localStorage
  const token = window.localStorage.getItem('token');
  // create a new instance of axios with the config object
  const localApi = axios.create({
    timeout: 10000,
    headers: {
      authorization: token,
    },

    // temporary fake url until we get the real one from backend
    baseURL: 'http://localhost:5000',
  });
  const cloudinaryApi = axios.create({
    timeout: 10000,
    headers: {
      authorization: token,
    },

    // temporary fake url until we get the real one from backend
    baseURL: process.env.REACT_APP-CLOUDINARY-URL,
  });


  return {localApi, cloudinaryApi};
};
