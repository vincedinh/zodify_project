import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState([]);

  async function fetchUrl() {
    const res = await fetch(url);
    const json = await res.json();
    setData(json);
  }

  useEffect(() => {
    fetchUrl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [data];
}

export default useFetch;