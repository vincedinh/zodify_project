import React from 'react';
import {
  Nav,
  Navbar,
} from 'react-bootstrap/';

import { useAuth } from '../../context/AuthContext';

import './NavigationBar.css';
import * as SPOTIFY from "../../constants/spotify";
import * as ROUTES from '../../constants/routes.js'

const CLIENT_ID = SPOTIFY.SPOTIFY_CLIENT_ID
const REDIRECT_URL_AFTER_LOGIN = `${window.location.origin}/webapp`
const SCOPES = ["user-read-private", "user-read-email", "user-top-read"];

const NavigationBar = () => {
  const auth = useAuth();

  let url = 'https://accounts.spotify.com/authorize';
  url += '?response_type=token';
  url += '&client_id=' + encodeURIComponent(CLIENT_ID);
  url += '&scope=' + encodeURIComponent(SCOPES);
  url += '&redirect_uri=' + encodeURIComponent(REDIRECT_URL_AFTER_LOGIN);
  url += '&state=' + encodeURIComponent(auth.user);


  return (
    <Navbar expand="lg" variant="dark" className="NavigationBar">
        <Navbar.Brand href={ROUTES.HOME} className='custom-brand-color'>Zodify</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className='custom-toggle' />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {(auth.user) ? (
                <>
                  <Nav.Link href={ROUTES.HOME} onClick={auth.logout} className='auth custom-text-color'>Logout</Nav.Link>
                  <Nav.Link href={url} className='custom-text-color'>Web App</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link href={ROUTES.SIGN_UP} className='auth custom-text-color'>Register</Nav.Link>
                  <Nav.Link href={ROUTES.LOGIN} className='auth custom-text-color'>Login</Nav.Link>
                </>
              )}
            <Nav.Link href={ROUTES.ABOUT} className='custom-text-color'>About</Nav.Link>
            <Nav.Link href={ROUTES.PRIVACY_POLICY} className='custom-text-color'>Privacy Policy</Nav.Link>
            <Nav.Link href={ROUTES.CONTACT} className='custom-text-color'>Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  )
};

export default NavigationBar;