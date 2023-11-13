import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const RedirectIfLoggedIn = ({children}) => {
  let userItem = localStorage.getItem("user");
  console.log(userItem)
  return userItem ? <Navigate to="/app" /> : children;
}

export default RedirectIfLoggedIn;