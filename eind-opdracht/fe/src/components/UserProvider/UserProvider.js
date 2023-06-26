import React, { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

import * as userAPI from 'api/user'
import * as Routes from 'constants/Routes'

export const UserContext = createContext({})

export const useUser = () => {
    return useContext(UserContext)
}

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const login = async (data) => {
        setLoading(true)
        setError(null)

        try {
            const response = await userAPI.login(data)
            if (response.status >= 400) {
                return setError('Oeps, er ging iets fout')
            }
            if (response.status === 404) {
                return setError('Dit email-adres bestaat niet, registreer')
            }

            const user = await response.json()
            setUser(user)

            navigate(Routes.CUSTOMERS)
        } catch (e) {
            console.log(e)
            return setError('Oeps, er ging iets fout')
        } finally {
            setLoading(false)
        }
    }

    const signUp = async (data) => {
        setLoading(true)
        setError(null)

        try {
            const response = await userAPI.createUser(data)

            if (response.status === 409) {
                return setError('Dit email-adres bestaat al. Login!')
            }
            if (response.status >= 400) {
                return setError('Oeps, er ging iets fout')
            }

            const user = await response.json()
            setUser(user)
        } catch (e) {
            console.log(e)
            return setError('Oeps, er ging iets fout')
        } finally {
            setLoading(false)
        }
    }

    const logout = () => {}

    const values = {
        user,
        loading,
        error,

        login,
        signUp,
        logout
    }

    return (
        <UserContext.Provider value={values}>
            {children}
        </UserContext.Provider>
    )
}

UserProvider.propTypes = {
    children: PropTypes.node
}

export default UserProvider
