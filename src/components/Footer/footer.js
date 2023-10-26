import React from 'react';
import { Link } from 'react-router-dom';

import './Footer.css'
import * as ROUTES from '../../constants/routes.js'

const Footer = () => {
  return (
    <div className="Footer">
      <p>
        Made by{' '}
        <a href="https://www.github.com/vincedinh">Vince Dinh</a>
      </p>
      <p style={{fontStyle: 'italic'}}>
        This app is optimized for mobile platforms.
      </p>
      <div>
        <Link to={ROUTES.HOME}>
            <li>Home</li>
          </Link>
          <div className='Divider'>|</div>
          <Link to={ROUTES.ABOUT}>
            <li>About</li>
          </Link>
          <div className='Divider'>|</div>
          <Link to={ROUTES.PRIVACY_POLICY}>
            <li>Privacy Policy</li>
          </Link>
          <div className='Divider'>|</div>
          <Link to={ROUTES.CONTACT}>
            <li>Contact</li>
          </Link>
      </div>
    </div>
  )
}
export default Footer;