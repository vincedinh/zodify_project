import { useState, useEffect } from 'react';

function useFetch(relativeUrl) {
  const [data, setData] = useState([]);

  async function fetchUrl() {
    try {
      // Get the current domain (protocol + hostname)
      const currentDomain = window.location.protocol + '//' + window.location.hostname;
      // Construct the full URL by appending the relative URL to the current domain
      const fullUrl = `${currentDomain}${relativeUrl}`;

      const res = await fetch(fullUrl);
      const json = await res.json();

      setData(json);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchUrl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [data];
}

export default useFetch;