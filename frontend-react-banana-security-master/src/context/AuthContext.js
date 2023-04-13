import React, {createContext, useContext, useState} from 'react';

export const AuthContext = createContext({});

export const useAuth = () => {
    return useContext(AuthContext);
}

function AuthProvider({ children }) {
    // const [isAuth, setIsAuth] = useState(false);
const [isAuth, setIsAuth] = useState({
    isAuthenticated: false,
    user: null,
});

    function login(token) {

        // we krijgen een token aangeleverd (die we van de backend hebben gehad)
        // token in de local storage plaatsen
        localStorage.setItem('token', token);
        console.log("Gebruiker is ingelogd")
        // inforamtie in de state plaatsen
        // authentication op true zetten in state
        setIsAuth({
            isAuthenticated: true,
            user: {
                username: 'pietpieters',
                email: 'pietpieters@novi.nl'
            }
        });
    }

    function logout() {

        //token uit de local storage verwijderen
        console.log("Gebruiker is uitgelogd")
        //gebruikers gegevens uit de state verwijderen
        //authentication op false zetten
        setIsAuth({
            isAuthenticated: false,
            user: null,
        });
    }

    const value = {
        ...isAuth,
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