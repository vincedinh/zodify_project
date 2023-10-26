// Thank you to Carmelle Codes on Youtube for this!

import React, { useState, useEffect, useContext, createContext } from 'react';
// import { useNavigate } from 'react-router-dom';

import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';

const AuthContext = createContext()

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const firebaseAuth = getAuth();

  const login = ({email, password, callback}) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password)
    .then((userCredential) => {
      setUser(userCredential.user);
      callback();
    })
    .catch((error) => 
    {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode + ": " + errorMessage);
    });
  };

  const signup = ({email, password}) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
      })
      .catch((error) => 
      {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode + ": " + errorMessage);
      });
  } 

  const logout = () => {
    return signOut(firebaseAuth)
      .then(() => {
        setUser(false);
      })
      .catch((error) => 
      {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode + ": " + errorMessage);
      });
  };

  const sendPasswordResetEmail = (email) => {
    return firebaseAuth
      .sendPasswordResetEmail(email)
      .then(() => {
        return true;
      })
      .catch((error) => 
      {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode + ": " + errorMessage);
      });
  };

  const confirmPasswordReset = (code, password) => {
    return firebaseAuth
    .confirmPasswordReset(code, password)
    .then(() => {
      return true;
    })
    .catch((error) => 
    {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode + ": " + errorMessage);
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(false);
      }
    })

    return () => unsubscribe();
  }, [firebaseAuth]);


  return {
    user,
    login,
    signup,
    logout,
    sendPasswordResetEmail,
    confirmPasswordReset
  };
}