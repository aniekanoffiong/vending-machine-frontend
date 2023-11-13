import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from './context/AppContext';

const PrivateRoute = ({children}) => {
    let { user } = useContext(AppContext);
    let userItem = localStorage.getItem("user");

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return user || userItem ? children : <Navigate to="/" />;
}

export default PrivateRoute;