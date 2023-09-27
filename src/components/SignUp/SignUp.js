import React, { useContext, useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

import { FirebaseContext } from "../../context/FirebaseContext";
import './SignUp.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { firebase } = useContext(FirebaseContext);

  return (
    <div className='container'>
      <form onSubmit={(event) => {
        event.preventDefault(); /** Prevent refresh of page */
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => 
            {
              const user = userCredential.user;
            })
          .catch((error) => 
            {
              const errorCode = error.code;
              const errorMessage = error.message;
              alert(errorCode + ": " + errorMessage);
            });
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