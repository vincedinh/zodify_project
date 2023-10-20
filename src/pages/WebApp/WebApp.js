import React, { useEffect, useRef } from "react";
import { 
  Container,
  Row, 
  Col,
  Spinner,
} from "react-bootstrap";

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

      // Keeping track of when token expires
      // Converted expires at time from seconds to milliseconds
      const tokenExpiresAt = Date.now() + parseInt(expires_in) * 1000;
      localStorage.setItem('tokenExpiresAt', tokenExpiresAt);
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
    <Container fluid className='displayApp'>
      <Row>
        <h1>Hello, {userDetails.display_name}!</h1>
      </Row>
      <Row>
        <Col>
          <GetZodiac/>
        </Col>
      </Row>
    </Container>
  ) : (
    <Container fluid className='displayApp'>
      <Row>
        <Col>
          <Spinner animation='border' className='spinner'/>
          <h1 className='displayAppLoading'>Loading user data...</h1>
        </Col>
      </Row>
    </Container>
  )
}

export default WebApp;

