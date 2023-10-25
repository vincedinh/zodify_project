import { useEffect, useState } from "react";
import axios from "axios";

const SPOTIFY_ENDPOINT_TOP = 'https://api.spotify.com/v1/me/top/artists'
const SPOTIFY_ENDPOINT_USER = 'https://api.spotify.com/v1/me'



const useSpotifyData = () => {
  // State variables to store Spotify data
  const [token, setToken] = useState("");
  const [data, setData] = useState({});
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const handleGetTopArtists = async () => {
    setLoading(true);

    // Delay the API call by 400ms
    setTimeout(() => {
      axios({
        method: 'get',
        url: SPOTIFY_ENDPOINT_TOP,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        params: {
          time_range: 'short_term',
          limit: 10,
        },
      })
        .then(async (res) => {
          // Handle the response with the top artists for the short-term period.
          /**
           * give weights to the artists' genres based on their positions
           * set a WEIGHT_MAX for artist, based on their position on the list (WEIGHT_MAX = (list.length - index)/list.length))
           * For each of the artist's genres, distribute the WEIGHT_MAX amongst the genres
           *  by: 1. taking the length of the artist's genre list and subtracting the index
           *      2. and dividing that by the length of the artist's genre list
           *      3. multiplying the fraction by WEIGHT_MAX
           * Increment the genre's weight by this weight
           */
          const topArtists = res.data.items;
          const topGenresWeights = new Map();

          for (let i = 0; i < topArtists.length; i++) {
            // String
            const artistName = topArtists[i].name;
            // List of strings
            const artistGenres = topArtists[i].genres;

            const WEIGHT_MAX = (topArtists.length - i)/topArtists.length

            for (let j = 0; j < artistGenres.length; j++) {
              const artistGenreWeight = ((artistGenres.length - j) / artistGenres.length)*WEIGHT_MAX
              if (topGenresWeights.has(artistGenres[j])) {
                const currentValue = topGenresWeights.get(artistGenres[j]);
                topGenresWeights.set(artistGenres[j], currentValue+artistGenreWeight);
              } else {
                topGenresWeights.set(artistGenres[j], artistGenreWeight);
              }
            }
          }

          let topGenres = topGenresWeights;
          setData({ topArtists, topGenres });
        })
        .catch((error) => {
          // const retryHeader = error.response.headers['retry-after'];
          console.error('Error:', error);
          // console.log(retryHeader)
        })
        .finally(() => {
          // Remove loading state
          setLoading(false);
        });
    }, 400);
  };

  // Gets user's display name
  const handleGetUser = async () => {
    setLoading(true);

    // Delay the API call by 400ms
    setTimeout(() => {
      axios({
        method: 'get',
        url: SPOTIFY_ENDPOINT_USER,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then(async (res) => {
          const userDetails = res.data;
          setUserDetails(userDetails);
          sessionStorage.setItem('userDetails', JSON.stringify(userDetails));
        })
        .catch((error) => {
          // const retryHeader = error.response.headers['retry-after'];
          console.error('Error:', error);
          // console.log(retryHeader)
        })
        .finally(() => {
          // Remove loading state
          setLoading(false);
        });
    }, 400);
  };

  // Runs once with no dependencies (on render)
  useEffect(() => {
    if (sessionStorage.getItem('accessToken')) {
      setToken(sessionStorage.getItem('accessToken'));
      setLoading(false);
    }
  }, []);

  return {data, handleGetTopArtists, handleGetUser, token, setToken, userDetails, setUserDetails, loading};
};

export default (useSpotifyData);