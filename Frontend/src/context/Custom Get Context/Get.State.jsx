import React, { useState } from 'react'
import GetContext from './Get.Context'

const GetState = (props) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { children } = props;
    const host = import.meta.env.VITE_HOST;

    const getDataFromAPI = async (endpoint) => {
        setLoading(true);
        try {
            const response = await fetch(`${host}${endpoint}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            if (response.status === 401) {
                localStorage.removeItem('user');
                window.location.href = '/login';
            }
            
            const data = await response.json();
            if (data.error) {
                throw new Error(data.error);
            }
            if (data.message) {
                return data?.data;
            }
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <GetContext.Provider value={{
            loading,
            error,
            getDataFromAPI
        }}>
            {children}
        </GetContext.Provider>
    )
}

export default GetState;