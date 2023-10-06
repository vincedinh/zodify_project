import React,
{
  useState,
  useEffect,
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
    // console.log(key)
    // console.log(value)
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
 * @param {*} zodiacCountMap points that the current zodiac has -- this is what we increment
 * @returns increments points in zodiacCountMap for each zodiac that has genreValuePair[0] in its list
 */
function compareZodiac(zodiacGenreMap, genreValuePair, zodiacCountMap) {
  return Object.entries(zodiacGenreMap).map(([animalid, genres], idx) => {
    // 
    const count = genres.filter((g) => g === genreValuePair[0]).length;

    // Increment the count
    zodiacCountMap[animalid] = (zodiacCountMap[animalid] || 0) + count*genreValuePair[1]; 
    return (
      <div key={idx}>
        {`${animalid}: `}
        <p>Count: {count}</p>
      </div>
    );
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
  const { data, handleGetTopArtists, token, setToken } = useSpotifyData();

  const [zodiacData] = useFetch(
    'http://localhost:9000/api/getList'
  );

  // Type is plain object
  const zodiacGenreMap = zodiacData.reduce((acc, item) => {
    acc[item.animalid] = item.genres;
    return acc;
  }, {});

  // Type is plain object
  let zodiacCountMap = zodiacData.reduce((acc, item) => {
    acc[item.animalid] = 0;
    return acc;
  }, {});

  return (
    <div>
      <DisplayZodiacCounts zodiacCountMap={zodiacCountMap}/>
      <button onClick={handleGetTopArtists}>Get Top Artists</button>
      {
        data?.topGenres instanceof Map ? (
          // Convert iterable entries from data.topGenres map into array of key-value pairs (tuples)
          [...data.topGenres.entries()].map(([genre, value], index) => (
            <div key={index}>
              <h1>{genre}: {value} points</h1>
              {compareZodiac(zodiacGenreMap, [genre, value], zodiacCountMap)}
            </div>
          ))
        ) : (
          // All the genres that the user listens to are either not stored yet in the zodiac database
          // or there is a problem retrieving the data.
          <p>Sorry, not enough data or could not retrieve Spotify or zodiac data.</p>
          // console.error("Error: could not retrieve Spotify data or zodiac data.")
        )
      }
      <h1>Your music's zodiac animal is: {getKeyWithMaxValue(zodiacCountMap)}</h1>
    </div>
  );
};

export default GetZodiac;