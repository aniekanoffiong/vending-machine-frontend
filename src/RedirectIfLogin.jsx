import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from './context/AppContext';

const RedirectIfLoggedIn = ({children}) => {
  let userItem = localStorage.getItem("user");
  return userItem ? <Navigate to="/app" /> : children;
}

export default RedirectIfLoggedIn;