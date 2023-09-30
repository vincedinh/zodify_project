import React, { useEffect, useState } from "react";
import axios from "axios";

const SPOTIFY_ENDPOINT = 'https://api.spotify.com/v1/me/top/artists'

const SpotifyGetTopArtists = () => {
  // State variables to store Spotify data
  const [token, setToken] = useState("");
  const [data, setData] = useState({});

  // Runs once with no dependencies (on render)
  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      setToken(localStorage.getItem('accessToken'));
    }

  }, []);

  const handleGetTopArtists = () => {

    return axios({
      method: 'get',
      url: SPOTIFY_ENDPOINT,
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
        const topArtists = res.data.items;
        const topGenresSet = new Set()
        topArtists.forEach((artist) => {
          const artistName = artist.name;
          const artistGenres = artist.genres;

          artistGenres.forEach((genre) => {
            topGenresSet.add(genre);
          })

          // console.log(`Artist: ${artistName}`);
          // console.log(`Genres: ${artistGenres.join(', ')}`);
          // console.log('---');
        })
        let topGenres = [...topGenresSet];
        setData({topArtists, topGenres});

      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <>
      <button onClick={handleGetTopArtists}>Get Top Artists</button>
      {Array.isArray(data?.topGenres) ? (
        data.topGenres.map((genre, index) => <p key={index}>{genre}</p>)
        ) : (
          console.log(data)
      )}
    </>
  );
};

export default SpotifyGetTopArtists;