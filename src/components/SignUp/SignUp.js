import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import './SignUp.css';
import * as ROUTES from '../../constants/routes';
import { useAuth } from "../../context/AuthContext"

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const auth = useAuth();
  let nav = useNavigate();

  return (
    <div className='container'>
      <form onSubmit={(event) => {
        event.preventDefault(); /** Prevent refresh of page */
        auth.signup({email, password, callback: () => {nav(ROUTES.LOGIN)}})
        setEmail('');
        setPassword('');
      }}
    >
        <label>Email</label>
        <input 
          type='email' 
          value={email} 
          onChange={(event) => setEmail(event.target.value)}/>
        <label>Password</label>
        <input type='password'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  )
}

export default SignUp;