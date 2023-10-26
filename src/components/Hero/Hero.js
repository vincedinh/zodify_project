import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "./Hero.css";

import { useAuth } from "../../context/AuthContext";
import * as ROUTES from '../../constants/routes.js'
import * as SPOTIFY from "../../constants/spotify";
import ZodiacScroller from "../ZodiacScroller/ZodiacScroller";

const CLIENT_ID = SPOTIFY.SPOTIFY_CLIENT_ID
const REDIRECT_URL_AFTER_LOGIN = `${window.location.origin}/webapp`
const SCOPES = ["user-read-private", "user-read-email", "user-top-read"];

const Hero = () => {
  const auth = useAuth();
  const nav = useNavigate();

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
        {(auth.user) ? (
            <>
              <Button size="lg" className='spotifyButton' onClick={handleLogin}>Spotify Login</Button>
              <p style={{fontStyle: 'italic', paddingTop: '15px'}}>
                You're logged into Zodify! <br/>
                *Now, login to Spotify to access the app.*
              </p>
            </>
          ) : (
            <>
              <Button size="lg" className='loginButton' onClick={() => nav(ROUTES.SIGN_UP)}>Register</Button>
              <p style={{fontStyle: 'italic', paddingTop: '15px'}}>
                Register or <a className='highlightTextLogin' href="/Login">login here</a> to access the app.
              </p>
            </>
        )}
      </div>
      <ZodiacScroller/>
    </div>
  )
}

export default Hero;