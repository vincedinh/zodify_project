// Firebase disabled for now //

import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { 
  Container,
  Row, 
  Col,
  Button,
  Card
} from 'react-bootstrap';

import { useAuth } from "../../context/AuthContext"

import * as ROUTES from '../../constants/routes';


import './SignUp.css';

// Registration form template based on: https://bootcamp.uxdesign.cc/build-react-login-sign-up-form-ui-with-bootstrap-5-7288c8ca15b7
const SignUp = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');

  
  const auth = useAuth();
  let nav = useNavigate();
  const handleFormSubmit = (event) => {
    event.preventDefault(); // Prevent refresh of the page
    auth.signup({email, password, callback: () => {nav(ROUTES.LOGIN)}})
    setEmail('');
    setPassword('');
  };

  return (
    <Container fluid className='displaySignUp'>
      <Row>
        <Col>
          <Card className='Card'>
              <Card.Title className='zodiacCardTitle'>
                  <div>
                    <h1 className='highlightText'>Sign Up</h1> 
                  </div>
              </Card.Title>
              <Card.Subtitle className='subtitle'>
                <p>Thank you for your interest!<br/>Please register your info below.</p>
              </Card.Subtitle>
              <Card.Body>
              <form onSubmit={handleFormSubmit}>
                <div className="mb-3">
                  <label>Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>
                <div className="d-grid">
                  <Button type="submit" className="submitButton">
                    Sign Up
                  </Button>
                </div>
                <p className="forgot-password text-right">
                  Already registered? <a className='highlightText' href="/Login">Sign in</a>!
                </p>
              </form>
              </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default SignUp;