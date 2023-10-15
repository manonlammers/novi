import React, { createContext, useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

import * as authAPI from 'api/auth'
import { getAuthStoreData, clearAuthStoreData, setAuthStoreData } from 'utils/authStore'
import { setTokenHeader, clearTokenheader } from 'utils/request'
import * as Routes from 'constants/Routes'

export const UserContext = createContext({})

export const useUser = () => {
    return useContext(UserContext)
}

export const UserProvider = ({ children }) => {
    const navigate = useNavigate()
    const [didInitialize, setDidInitialize] = useState(false)
    const [user, setUser] = useState(null)
    const [company, setCompany] = useState(null)
    const [customers, setCustomers] = useState([])

    const initialize = async (user) => {
        const auth = getAuthStoreData()
        if (!auth) {
            return setDidInitialize(true)
        }

        try {
            const response = await authAPI.login(auth.user)
            if (response.status !== 201) return
            const { token, user: newUser } = await response.json()
            setTokenHeader(token)
            setAuthStoreData(token, newUser)
            setUser(newUser)
        } catch (e) {
            console.log(e)
        } finally {
            setDidInitialize(true)
        }
    }

    const logout = () => {
        clearTokenheader()
        clearAuthStoreData()

        setUser(null)
        setCompany(null)
        setCustomers([])

        navigate(Routes.LOGIN)
    }

    const values = {
        user,
        company,
        customers,

        setUser,
        setCompany,
        setCustomers,

        logout
    }

    useEffect(() => {
        initialize()
    }, [])

    console.log('UserProvider: ', {
        user,
        didInitialize
    })

    return (
        <UserContext.Provider value={values}>
            {didInitialize && children}
        </UserContext.Provider>
    )
}

UserProvider.propTypes = {
    children: PropTypes.node
}

export default UserProvider
