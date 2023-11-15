import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from './context/AppContext';

const PrivateRoute = ({children}) => {
    let { user, checkAuthState } = useContext(AppContext);

    useEffect(() => {
        console.log(`checking user private`);
        if (!user) {
            checkAuthState();
        }
        console.log(`done checking user private`)
    }, [user])

    let userItem = localStorage.getItem("user");

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return user || userItem ? children : <Navigate to="/" />;
}

export default PrivateRoute;