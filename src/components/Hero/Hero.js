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
            Note: This app is currently awaiting Extended Quota mode from Spotify API. <br/>
            Request access <a href="/contact" className='highlightText'>here</a> for your Spotify account. <br/>
            *If you have access, login to app using Spotify credentials only - (Google/Apple/Facebook not supported).*
          </p>
      </div>
      <ZodiacScroller/>
    </div>
  )
}

export default Hero;