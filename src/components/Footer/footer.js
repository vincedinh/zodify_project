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
      <ul>
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
      </ul>
    </div>
  )
}
export default Footer;

/**
 * IMAGE LINKS:
 * Zodiacs: 
 * <a href="https://www.freepik.com/free-vector/chinese-new-year-animals-colorful-animal-zodiac-sign-stickers-set_16265752.htm#query=vietnamese%20zodiac&position=10&from_view=search&track=ais">Image by rawpixel.com</a> on Freepik
 * Cat:
 * Image by <a href="https://www.freepik.com/free-psd/cute-cat-element-isolated_43305505.htm#page=2&query=artistic%20cat%20cartoon&position=29&from_view=search&track=ais">Freepik</a>
 * Unicorn:
 * 
 */