import React from 'react';
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import * as ROUTES from '../../constants/routes';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();
  let nav = useNavigate();

  return (
    <div className='container' margin-top='20px'>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          auth.login({email, password, callback: () => {nav(ROUTES.WEB_APP)}})
        }}>
          <label>Enter your email:</label>
          <input
            type='email'
            placeholder='Password'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <label>Enter your password:</label>
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button type='submit'>Login</button>
        </form>
    </div>
  )

}

export default Login;