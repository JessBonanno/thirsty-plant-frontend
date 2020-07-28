import { useState, useEffect } from 'react';
import axios from 'axios';
/**
 * Custom hook to handle crud operations
 *
 * @export
 * @param {*} { api, method, url, data = null, config = null }
 * @return {*} { response, error, isLoading }
 */

export default function useFetch({
  api,
  method,
  url,
  data = null,
  config = null,
}) {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        api[method](url, data, config).then(res => {
          setResponse(res.data);
          setIsLoading(false);
        });
      } catch (err) {
        console.log(err);
        setError(err);
      }
    };

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [method, url, data, config]);

  return { response, error, isLoading, setIsLoading };
}
