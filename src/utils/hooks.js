import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState([]);

  async function fetchUrl() {
    try {
      const res = await fetch(url);
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