import React, {createContext, useState, useEffect } from 'react';

export const SpotifyUserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const mockUserDetails = {
      display_name: "string",
      images: [
        {
          url: "string",
          height: 300,
          width: 300,
        }
      ],
    }
    setUserDetails(mockUserDetails);
  }, []);

  return (
    <SpotifyUserContext.Provider value={userDetails}>
      {children}
    </SpotifyUserContext.Provider>
  )
};