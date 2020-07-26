import axios from 'axios';

/**
 * Component to handle authorized api requests with token
 *
 * @returns {object} an object with api properties for axios
 */
export const axiosWithAuth = () => {
  //  get the token from localStorage
  const token = window.localStorage.getItem('token');
  console.log({ token });
  // create a new instance of axios with the config object
  const cloudinaryAPI = axios.create({
    timeout: 10000,
    baseURL: `https://api.cloudinary.com/v1_1/wpnbbzl6/image/upload`,
  });

  const backendAPI = axios.create({
    timeout: 10000,
    headers: {
      authorization: token,
    },
    // temporary fake url until we get the real one from backend
    baseURL: 'https://bw-water-my-plants.herokuapp.com/api',
  });

  return backendAPI;
};
