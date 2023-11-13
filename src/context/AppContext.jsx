import { createContext, useState } from 'react';
import configData from '../../config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AppContext = createContext({});

const axiosInstance = axios.create({
    baseURL: configData.API_HOST,
    headers: {
        'Access-Control-Allow-Credentials': true
    }
})

function AppProvider({ children }) {
    const [user, setUser] = useState(null);
    const [products, setProducts] = useState(null);
    const [alertMessage, setAlertMessage]= useState("");
    const navigate = useNavigate();

    const handleAuthSubmission = function(e, formData) {
        e.preventDefault();
        axiosInstance.post(`/api/login`, formData)
            .then(({data}) => {
                localStorage.setItem("user", JSON.stringify(data));
                setUser(data);
                navigate('/app');
                getProducts();
            });
    }

    const register = function(e, formData) {
        e.preventDefault();
        axiosInstance.post(`/api/users`, formData)
            .then(({data}) => {
                localStorage.setItem("user", JSON.stringify(data));
                setUser(data);
                navigate('/app');
                getProducts();
            });
    }

    const getProducts = () => {
        axiosInstance.get(`/api/products`)
            .then(({data}) => setProducts(data));
    }

    const deposit = (e, formData) => {
        e.preventDefault();
        axiosInstance.post(`/api/deposit`, formData)
            .then(({data}) => setAlertMessage(data.message));
    }

    const buyProduct = (e, formData) => {
        e.preventDefault();
        axiosInstance.post(`/api/buy`, formData)
            .then(({data}) => setAlertMessage(data.message));
    }

    const logout = (e) => {
        e.preventDefault();
        axiosInstance.post(`/api/logout`, {})
            .then(() => {
                localStorage.removeItem("user");
                setAlertMessage("Logout successful");
            }).catch((err) => {
                localStorage.removeItem("user");
                setAlertMessage("Logout successful");
            });
    }

    const logoutAll = (e) => {
        e.preventDefault();
        axiosInstance.post(`/api/logout/all`, {})
            .then(() => {
                localStorage.removeItem("user");
                setAlertMessage("All other accounts have been logged out");
            });
    }
  
    return (
      <AppContext.Provider
        value={{
            user,
            logout,
            setUser,
            deposit,
            register,
            logoutAll,
            buyProduct,
            getProducts,
            handleAuthSubmission,
        }}>
          {children}
      </AppContext.Provider>
    );
}
  
  export { AppProvider, AppContext };