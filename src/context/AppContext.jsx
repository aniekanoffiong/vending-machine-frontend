import { createContext, useEffect, useState } from 'react';
import configData from '../../config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AppContext = createContext({});

const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: configData.API_HOST,
    credentials: 'include',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true
    }
})

function AppProvider({ children }) {
    const [user, setUser] = useState(null);
    const [products, setProducts] = useState(null);
    const navigate = useNavigate();
        
    const setAlertMessage = (message, type) => {
        toast[type || "success"](message)
    }

    const checkAuthState = () => {
        axiosInstance.post(`/api/auth`)
            .then(({data}) => {
                localStorage.setItem("user", JSON.stringify(data));
                setUser(data);
                navigate('/app');
                getProducts();
            }).catch(handleApiFailure);
    }

    const handleApiFailure = (error) => {
        console.log("checking api failure", error);
        if (error.response?.status === 401) {
            localStorage.removeItem("user");
            navigate('/')
            setAlertMessage("Account has been logged out");
        }
        setAlertMessage(error.response?.message || error.response?.data?.message);
    }

    const handleAuthSubmission = function(e, formData) {
        e.preventDefault();
        axiosInstance.post(`/api/login`, formData)
            .then(({data}) => {
                localStorage.setItem("user", JSON.stringify(data));
                setUser(data);
                navigate('/app');
                getProducts();
            }).catch((err) => {
                console.log(err);
                setAlertMessage(err.response.data.message);
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
            }).catch((err) => {
                console.log(err);
                setAlertMessage(err.response.data.message);
            });
    }

    const getProducts = () => {
        axiosInstance.get(`/api/products`)
            .then(({data}) => setProducts(data))
            .catch(handleApiFailure);
    }

    const createProduct = async (formData) => {
        axiosInstance.post(`/api/products`, formData)
            .then(({data}) => {
                setProducts([...products, ...[data]])
                setAlertMessage("Product successfully created")
            })
            .catch(handleApiFailure);
    }

    const updateProduct = async (productId, formData) => {
        axiosInstance.put(`/api/products/${productId}`, formData)
            .then(({data}) => {
                setProducts(products.map(item => {
                    if (item.id === formData.id) {
                        item = data;
                    }
                    return item;
                }))
                setAlertMessage("Product successfully updated")
            })
            .catch(handleApiFailure);
    }

    const deleteProduct = async (productId) => {
        axiosInstance.delete(`/api/products/${productId}`)
            .then(({data}) => {
                setProducts(products.filter(item => item.id !== productId))
                setAlertMessage("Product successfully deleted")
            })
            .catch(handleApiFailure);
    }

    const deposit = async (e, formData) => {
        e.preventDefault();
        axiosInstance.post(`/api/deposit`, formData)
            .then(({data}) => {
                setUser({...user, deposit: data.newBalance})
                setAlertMessage(data.message)
            }).catch(handleApiFailure);
    }

    const buyProduct = async (e, formData) => {
        e.preventDefault();
        axiosInstance.post(`/api/buy`, formData)
            .then(({data}) => {
                setUser({...user, deposit: user.deposit - data.totalSpent})
                setProducts(products.map(item => {
                    if (item.id === formData.productId) {
                        item.amountAvailable = data.purchasedProducts.product.amountAvailable; 
                    }
                    return item;
                }))
                setAlertMessage("Successfully bought product")
            })
            .catch(handleApiFailure);
    }

    const logout = (e) => {
        e.preventDefault();
        axiosInstance.post(`/api/logout`, {})
            .then(() => {
                localStorage.removeItem("user");
                setAlertMessage("Logout successful");
            }).catch(handleApiFailure);
    }

    const logoutAll = async (e) => {
        e.preventDefault();
        axiosInstance.post(`/api/logout/all`, {})
            .then(() => {
                setAlertMessage("All other accounts have been logged out");
            }).catch(handleApiFailure);
    }
  
    return (
      <AppContext.Provider
        value={{
            user,
            logout,
            setUser,
            deposit,
            register,
            products,
            logoutAll,
            buyProduct,
            getProducts,
            createProduct,
            updateProduct,
            deleteProduct,
            checkAuthState,
            handleAuthSubmission,
        }}>
          {children}
      </AppContext.Provider>
    );
}
  
export { AppProvider, AppContext };