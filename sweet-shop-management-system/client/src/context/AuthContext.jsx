import React, { createContext, useState, useEffect } from 'react';
import { getUser, getToken, setAuth, logout as doLogout } from '../utils/auth';

export const AuthContext = createContext({ user: null, token: null, setAuth: () => {}, logout: () => {} });

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(getUser());
    const [token, setToken] = useState(getToken());

    useEffect(() => {
        const onStorage = () => {
            setUser(getUser());
            setToken(getToken());
        };
        window.addEventListener('storage', onStorage);
        return () => window.removeEventListener('storage', onStorage);
    }, []);

    const handleSetAuth = ({ user: u, token: t }) => {
        setAuth({ user: u, token: t });
        setUser(u);
        setToken(t);
    };

    const logout = () => {
        doLogout();
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, setAuth: handleSetAuth, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
