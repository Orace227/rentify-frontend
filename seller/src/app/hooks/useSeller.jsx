// UserContext.js
'use client';
import React, { createContext, useContext, useState } from 'react';

// Create a context
const UserContext = createContext();

// Create a context provider
export const SellerProvider = ({ children }) => {
  const [seller, setSeller] = useState({
    email: '',
    firstName: '',
    lastName: '',
    profileImagePath: '',
  });
  console.log(seller);
  const updateSeller = (newUserData) => {
    setSeller((prevUser) => ({ ...prevUser, ...newUserData }));
  };

  return (
    <UserContext.Provider value={{ seller, updateSeller }}>{children}</UserContext.Provider>
  );
};

// Custom hook to consume the context
export const useSeller = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useSeller must be used within a SellerProvider');
  }

  return context;
};
