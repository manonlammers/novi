import React, {createContext, useContext, useState, useEffect} from 'react';
import {useHistory} from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";
export const AuthContext = createContext({});

export const useAuth = () => {
    return useContext(AuthContext);
}

const initialAuth = {
    isAuth: false,
    user: null,
}

function AuthProvider({ children }) {
    const [auth, setAuth] = useState(initialAuth);
    const history = useHistory();

    function getTokenId(token) {
        return jwtDecode(token).sub;
    }

    useEffect(() => {
        init();
    },[]);

    async function init() {
        const token = localStorage.getItem('token');
        if (token) {
            await login(token);
            history.push('/profile');
        }
    }

    async function getUserProfile(id) {
        try {
            const response = await axios.get(`http://localhost:3000/users/${id}`);
            return response.data;
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    async function login(token) {
        localStorage.setItem('token', token);
        const userId = getTokenId(token);
        const user = await getUserProfile(userId);

        setAuth({
            isAuth: true,
            user
        });
    }

    function logout() {
        localStorage.removeItem('token');
        setAuth(initialAuth);
    }

    const value = {
        ...auth,
        login,
        logout,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;