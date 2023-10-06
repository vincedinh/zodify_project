import React,
{
  useState,
  useEffect,
  useRef,
}
from 'react';
import useFetch from '../../../../utils/hooks';

import useSpotifyData from "../spotifyData/index.js";


/**
 * 
 * @param {*} data plain JS object passed in
 * @returns gets the key of the highest value in the object
 */
function getKeyWithMaxValue(data) {
  let maxKey = null;
  let maxValue = -1;

  for (const [key, value] of Object.entries(data)) {
    if (value > maxValue) {
      maxKey = key;
      maxValue = value;
    }
  }

  return maxKey;
}

/**
 * 
 * @param {*} zodiacGenreMap map of zodiac, genreList pairings
 * @param {*} genreValuePair current genre we are evaluating, where index 0 = genre name, index 1 = value
 * @returns increments points for each zodiac that has genreValuePair[0] in its list
 */
function compareZodiac(zodiacGenreMap, genreValuePair) {
  return Object.entries(zodiacGenreMap).map(([animalid, genres]) => {
    // 
    const count = genres.filter((g) => g === genreValuePair[0]).length;
    const points = count * genreValuePair[1]

    return {animalid, points}
  });
}

/**
 * 
 * @param {*} zodiacCountMap map of all the zodiacs and their points
 * @returns jsx display of the map
 */
function DisplayZodiacCounts({ zodiacCountMap }) {
  function isZero(count) {
    return count === 0;
  }
  const allCountsZero = Object.values(zodiacCountMap).every(isZero);

  if (!allCountsZero) {
    return (
      <div>
        <h2>Zodiac Genre Counts:</h2>
        {Object.entries(zodiacCountMap).map(([animalid, count], idx) => (
          <div key={idx}>
            <p>{animalid}: {count}</p>
          </div>
        ))}
      </div>
    );
  } else {
    return <h2>No zodiac generated yet!</h2>
  }
}


/**
 * Main function
 * @returns displays user zodiac based off of genres listened to
 */
const GetZodiac = () => {
  // fetches list of zodiacs and associated genres
  const { data, handleGetTopArtists, token, setToken, loading } = useSpotifyData();

  // Use a ref to track whether the effect has run (prevent constant re-renders)
  const hasInitialRenderRun = useRef(false);

  // Effect to set the token and call handleGetTopArtists on initial render
  // I don't know why it keeps re-rendering with the token as a dependency when the token doesn't change after logging in..
  useEffect(() => {
    if (!hasInitialRenderRun.current && token) {
      hasInitialRenderRun.current = true;
      handleGetTopArtists();
    }
  }, [token, handleGetTopArtists]);

  // Fetch zodiac relations
  const [zodiacData] = useFetch(
    'http://localhost:9000/api/getList'
  );

  // Type is plain object
  const zodiacGenreMap = zodiacData.reduce((acc, item) => {
    acc[item.animalid] = item.genres;
    return acc;
  }, {});

  // State to update the countMap once the user generates a zodiac
  const [zodiacCountMap, setZodiacCountMap] = useState(() => {
    const initialCountMap = zodiacData.reduce((acc, item) => {
      acc[item.animalid] = 0;
      return acc;
    }, {});
    return initialCountMap;
  });

  const [processingDone, setProcessingDone] = useState(false);

  let generatedZodiac = null;

  // Process genres. If genres have already been processed, do not increment count map further.
  const processGenres = () => {
    if (data?.topGenres instanceof Map && !processingDone) {
      const results = [...data.topGenres.entries()].map(([genre, value], index) => {
        return compareZodiac(zodiacGenreMap, [genre, value], zodiacCountMap);
      });
      results.forEach((zodiacResults) => {
        zodiacResults.forEach(({ animalid, points }) => {
          setZodiacCountMap((prevZodiacCountMap) => ({
            ...prevZodiacCountMap,
            [animalid]: (prevZodiacCountMap[animalid] || 0) + points,
          }));
        })
      })
      // console.log(zodiacCountMap);
      setProcessingDone(true);
    }
  };

  // Generate zodiac if genres have been processed
  if (processingDone) {
    generatedZodiac = (
      <h1>Your music's zodiac animal is: {getKeyWithMaxValue(zodiacCountMap)}</h1>
    );
  }

  function handleProcessGenres() {
    processGenres();
  }

  return (
    <div>
      <DisplayZodiacCounts zodiacCountMap={zodiacCountMap}/>
      <button onClick={handleProcessGenres}>Analyze Your Music!</button>
      {generatedZodiac}
    </div>
  );
};

export default GetZodiac;