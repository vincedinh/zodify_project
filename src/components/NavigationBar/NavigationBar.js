import React from 'react';
import { Link } from 'react-router-dom';

import './NavigationBar.css';
import * as ROUTES from '../../constants/routes.js'
import { useAuth } from '../../context/AuthContext';

const NavigationBar = () => {
  const auth = useAuth();
  return (
    <header className='NavigationBar'>
      <nav>
        <ul>
          <Link to={ROUTES.HOME}>
            <li>Home</li>
          </Link>
          { /** App tab is only accessible to those logged into Spotify/have a token */
            localStorage.getItem('accessToken') ? (
              <Link to={ROUTES.WEB_APP}>
                <li>App</li>
              </Link>
            ) : (
              <></>
            )
          }
          {/* { auth.user ? (
            <>
            <Link to={ROUTES.WEB_APP}>
              <li>App</li>
            </Link>
            <Link to={ROUTES.PROFILE}>
              <li>Profile</li>
            </Link>
            <li onClick={() => auth.logout()}>Logout</li>
            </>
            ) : (
              <>
                <Link to={ROUTES.LOGIN}>
                  <li>Login</li>
                </Link>
                <Link to={ROUTES.SIGN_UP}>
                  <li>Sign Up</li>
                </Link>
              </>
            )
          } */}
        </ul>
      </nav>
    </header>
  )
};

export default NavigationBar;