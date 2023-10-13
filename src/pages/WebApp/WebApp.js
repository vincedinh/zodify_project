import React, { useEffect, useRef } from "react";
import './WebApp.css';
import useSpotifyData from "./components/spotifyData/spotifyData";
import GetZodiac from "./components/getZodiac/index.js";

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

const WebApp = () => {

  // Old firebase login
  // const auth = useAuth();

  // Store Spotify access token for login session
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

  const { handleGetUser, userDetails, token, loading } = useSpotifyData();

  // Use a ref to track whether the effect has run (prevent constant re-renders)
  const hasInitialRenderRun = useRef(false);

  useEffect(() => {
    if (!hasInitialRenderRun.current && token) {
      hasInitialRenderRun.current = true;
      handleGetUser();
    }
  }, [token, handleGetUser])

  return !loading ? (
    <div className='displayApp'>
      <h1>Hello, {userDetails.display_name}!</h1>
      <GetZodiac/>
    </div>
  ) : (
    <div>
      <h1 className='displayApp'>Loading user data...</h1>
    </div>
  )
}

export default WebApp;

