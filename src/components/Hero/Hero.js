import React from "react";
import { Button } from "react-bootstrap";

import "./Hero.css";

import { useAuth } from "../../context/AuthContext";
// import * as ROUTES from '../../constants/routes.js'
import * as SPOTIFY from "../../constants/spotify";
import ZodiacScroller from "../ZodiacScroller/ZodiacScroller";

const CLIENT_ID = SPOTIFY.SPOTIFY_CLIENT_ID
const REDIRECT_URL_AFTER_LOGIN = `${window.location.origin}/webapp`
const SCOPES = ["user-read-private", "user-read-email", "user-top-read"];

const Hero = () => {
  const auth = useAuth();

  let url = 'https://accounts.spotify.com/authorize';
  url += '?response_type=token';
  url += '&client_id=' + encodeURIComponent(CLIENT_ID);
  url += '&scope=' + encodeURIComponent(SCOPES);
  url += '&redirect_uri=' + encodeURIComponent(REDIRECT_URL_AFTER_LOGIN);
  url += '&state=' + encodeURIComponent(auth.user);

  const handleLogin = () => {
    window.location = url;
  };

  return (
    <div className="hero">
      <div className='heroText'>
        <h1>Zodify</h1>
        <p>Find your music's spirit animal.</p>
          <Button size="lg" className='spotifyButton' onClick={handleLogin}>Spotify Login</Button>
          <p style={{fontStyle: 'italic', paddingTop: '15px'}}>
            *Login to Spotify to access the app.*
          </p>
      </div>
      <ZodiacScroller/>
    </div>
  )
}

export default Hero;