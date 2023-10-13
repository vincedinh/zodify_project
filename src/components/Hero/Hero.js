import React, { useEffect } from "react";
import "./Hero.css";

import { useAuth } from "../../context/AuthContext";
import * as SPOTIFY from "../../constants/spotify";

const CLIENT_ID = SPOTIFY.SPOTIFY_CLIENT_ID
const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/webapp"
const SCOPES = ["user-read-private", "user-read-email", "user-top-read"];

const getReturnedParamsFromSpotifyAuth = (hash) => {

  // Splits tokens after tag symbol in redirect url
  const stringAfterHashtag = hash.substring(1);
  const paramsInUrl = stringAfterHashtag.split("&");

  // reduce js function, accumulator and currentValue
  const paramsSplitUp = paramsInUrl.reduce((accumulator, currentValue) => {
    const [key, value] = currentValue.split('=');
    accumulator[key] = value;
    return accumulator;
  }, {});

  return paramsSplitUp;
}

const Hero = () => {
  useEffect(() => {
    if(window.location.hash) {
      const {
        access_token, 
        expires_in, 
        token_type,
      } = getReturnedParamsFromSpotifyAuth(window.location.hash)

      localStorage.clear();
      localStorage.setItem('accessToken', access_token);
      localStorage.setItem('tokenType', token_type);
      localStorage.setItem('expiresIn', expires_in);
      console.log('accssToken')
    }
  }, [])

  const auth = useAuth();

  var url = 'https://accounts.spotify.com/authorize';
  url += '?response_type=token';
  url += '&client_id=' + encodeURIComponent(CLIENT_ID);
  url += '&scope=' + encodeURIComponent(SCOPES);
  url += '&redirect_uri=' + encodeURIComponent(REDIRECT_URL_AFTER_LOGIN);
  url += '&state=' + encodeURIComponent(auth.user);

  const handleLogin = () => {
    console.log(localStorage.getItem('accessToken'))
    window.location = url;
  };

  return (
    <div className="Hero">
        <h1>Zodify</h1>
        <p>Find your music's spirit animal.</p>
        <button onClick={handleLogin}>Spotify Login</button>
    </div>
  )
}

export default Hero;