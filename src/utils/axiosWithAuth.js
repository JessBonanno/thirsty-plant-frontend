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

  const backendAPI = axios.create({
    timeout: 10000,
    headers: {
      token: token,
    },
    // temporary fake url until we get the real one from backend
    baseURL: 'https://bw-water-my-plants.herokuapp.com/api',
  });
  return backendAPI;
};
