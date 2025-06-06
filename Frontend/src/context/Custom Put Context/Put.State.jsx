import React, { useState } from 'react'
import PutContext from './Put.Context'
import { toast } from 'react-toastify';

const PutState = (props) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { children } = props;
    const host = import.meta.env.VITE_HOST;

    const putDataFromAPI = async (endpoint, formData) => {
        setLoading(true);
        try {
            const response = await fetch(`${host}${endpoint}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(formData)
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
                toast.success(data.message);
                return data?.data;
            }
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <PutContext.Provider value={{
            loading,
            error,
            putDataFromAPI
        }}>
            {children}
        </PutContext.Provider>
    )
}

export default PutState;