import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
// import { Navigate } from 'react-router-dom';

// import { useAuth } from "../../context/AuthContext";
// import * as ROUTES from '../../constants/routes';

const CLIENT_ID = "***REMOVED***"
const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/webapp"
const SCOPES = ["user-top-read"];

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

const WebApp = () => 
{
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
    window.location = url;
  };

  return (
    <div className='container'>
      <h1>Hello, {auth.user.email}!</h1>
      <button onClick={handleLogin}>Login to Spotify</button>
    </div>
  )
}

export default WebApp;

