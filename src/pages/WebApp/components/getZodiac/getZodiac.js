import React,
{
  useState,
  useEffect,
  useRef,
}
from 'react';
import useFetch from '../../../../utils/hooks'
import useSpotifyData from '../spotifyData/index.js';
import { ZODIAC_IMG } from '../../../../constants/images.js';

/**
 * 
 * @param {*} data plain JS object passed in
 * @returns gets the key of the highest value in the object
 */
function getZodiacWithMaxValue(data) {
  let maxKey = null;
  let maxValue = -1;

  if (data instanceof Map) {
    // Handle Map objects
    for (const [key, value] of data) {
      if (value > maxValue) {
        maxKey = key;
        maxValue = value;
      }
    }
  } else if (typeof data === 'object') {
    // Handle plain JavaScript objects
    for (const key in data) {
      if (data.hasOwnProperty(key) && data[key] > maxValue) {
        maxKey = key;
        maxValue = data[key];
      }
    }
  }

  // There is a matching Zodiac present, else return the user "Unicorn" status
  if (maxValue !== 0) {
    return maxKey;
  } else {
    return "Unicorn";
  }
  
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
 * @param {*} zodiacCountMap map of all the zodiacs and their points, used for testing and seeing user's zodiac points
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
  const { data, handleGetTopArtists, token } = useSpotifyData();

  // Use a ref to track whether the effect has run (prevent constant re-renders)
  const hasInitialRenderRun = useRef(false);

  // Effect to set the token and call handleGetTopArtists on initial render
  useEffect(() => {
    if (!hasInitialRenderRun.current && token) {
      hasInitialRenderRun.current = true;
      handleGetTopArtists();
    }
  }, [token, handleGetTopArtists]);

  // Fetch zodiac relations
  // Fix: Currently runs with every render, find way to only run on initial render
  let [zodiacData] = useFetch(
    'http://localhost:9000/api/getList'
  );

  // Type is plain object
  const zodiacGenreMap = zodiacData.reduce((acc, item) => {
    acc[item.animalid] = item.genres;
    return acc;
  }, {});

  // Type is plain object
  const zodiacDscrpMap = zodiacData.reduce((acc, item) => {
    acc[item.animalid] = [item.traits, item.dscrp];
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
      // Convert the Map to an array of key-value pairs
    // Sort the array in descending order based on values
    // Extract and print the keys in descending order
    const genresArray = [...(data.topGenres || new Map()).entries()];
    genresArray.sort((a, b) => b[1] - a[1]);
    const keysInDescendingOrder = genresArray.map(([genre, value]) => genre);
  
    function listGenres(genres) {
      if (genres) {
        return (
          <ul>
            {genres.map((genre, index) => (
              <li key={index}>{genre}</li>
            ))}
          </ul>
        );
      }
      return null;
    }

    let topZodiac = getZodiacWithMaxValue(zodiacCountMap)

    function DisplayTraits(traits) {
      // Convert the object to an array of key-value pairs
      const keyValuePairs = Object.entries(traits);

      // concatenate the pairs with commas
      const commaSeparatedText = keyValuePairs.map(([idx, value]) => `${value}`).join(', ');

      return (
        <div>
          {commaSeparatedText}
        </div>
      );
    }
  
    generatedZodiac = (
      <div>
        <h1>Your music's zodiac animal this month is: {topZodiac}</h1>
        <img src={ZODIAC_IMG[topZodiac]} alt={topZodiac} />
        <h2>{DisplayTraits(zodiacDscrpMap[topZodiac][0])}</h2>
        <h3>{zodiacDscrpMap[topZodiac][1]}</h3>
        <div>
          Your top genres this month:
        </div>
        <div style={{ fontStyle: 'italic', fontWeight: 'bold', color: 'black'}}>
          {listGenres(keysInDescendingOrder)}
        </div>
      </div>
    );
  }
  

  function handleProcessGenres() {
    processGenres();
  }

  return (
    <div>
      {/* <DisplayZodiacCounts zodiacCountMap={zodiacCountMap}/> */}
      <button onClick={handleProcessGenres}>Analyze Your Music!</button>
      {generatedZodiac}
      <p>*Disclaimer: these connections are symbolic and meant for creative interpretation rather than a direct astrological association.*</p>
    </div>
  );
};

export default GetZodiac;