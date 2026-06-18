"use client";
import { createContext, useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);

    // Function to fetch the logged-in user's profile
    const getUserData = async () => {
        try {
            const { data } = await axiosInstance.get('/api/user/data');
            if (data.success) {
                setIsLoggedIn(true);
                setUserData(data.userData);
            }
        } catch (error) {
            // No session found - user stays logged out
            setIsLoggedIn(false);
            setUserData(null);
        }
    };

    const logout = async () => {
    try {
        const { data } = await axiosInstance.post('/api/auth/logout');
        
        if (data.success) {
            setIsLoggedIn(false);
            setUserData(null);
            toast.success("Logged out successfully");
            // Optional: Move to login page automatically
            window.location.replace('/auth/login'); 
        }
    } catch (error) {
        toast.error(error.message);
    }
};

    // Run this check once when the app first starts
    useEffect(() => {
        getUserData();
    }, []);

    const value = {
        isLoggedIn, setIsLoggedIn,
        userData, setUserData,
        getUserData,
        logout
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};