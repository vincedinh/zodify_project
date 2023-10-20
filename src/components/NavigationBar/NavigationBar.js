import React from 'react';

import {
  Nav,
  Navbar,
  Container
} from 'react-bootstrap/';

import './NavigationBar.css';
import * as ROUTES from '../../constants/routes.js'

const NavigationBar = () => {
  // const auth = useAuth();
  return (
    <Navbar expand="lg" variant="dark" className="NavigationBar">
        <Navbar.Brand href={ROUTES.HOME} className='custom-brand-color'>Zodify</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className='custom-toggle' />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href={ROUTES.ABOUT} className='custom-text-color'>About</Nav.Link>
            <Nav.Link href={ROUTES.PRIVACY_POLICY} className='custom-text-color'>Privacy Policy</Nav.Link>
            <Nav.Link href={ROUTES.CONTACT} className='custom-text-color'>Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  )
};

export default NavigationBar;