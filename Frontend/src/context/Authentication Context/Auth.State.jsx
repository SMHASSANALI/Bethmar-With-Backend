import React, { useEffect, useState } from 'react'
import AuthContext from './Auth.Context'
import { toast } from 'react-toastify'

const AuthState = (props) => {
    const { children } = props;
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const host = import.meta.env.VITE_HOST;

    useEffect(() => {
        const getUser = JSON.parse(localStorage.getItem("user")) || null;
        if (getUser) {
            setUser(getUser);
        }
        setLoading(false);
    }, []);

    const login = async (email, password, isTrue) => {
        try {
            if (!email || !password) {
                toast.error("All fields are required");
                return;
            }

            const response = await fetch(`${host}auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ email, password, isTrue }),
            });
            const { data } = await response.json();
            localStorage.setItem("user", JSON.stringify(data));
            setUser(data);
            setLoading(false);
            toast.success("Login successful");
        } catch (error) {
            console.log(error);
            toast.error("Login failed");
            setLoading(false);
        }
    };

    const logout = async () => {

        try {
            const response = await fetch(`${host}auth/logout`, {
                method: "POST",
                credentials: "include",
            });
            const { message } = await response.json();
            toast.success(message);
        } catch (error) {
            console.log(error);
            toast.error("Logout failed");
        }
        setUser(null);
        toast.success("Logout successful");
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            login,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthState