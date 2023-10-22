import React, { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

import { clearTokenHeader } from 'utils/request'
import * as Routes from 'constants/Routes'

export const UserContext = createContext({})

export const useUser = () => {
    return useContext(UserContext)
}

export const UserProvider = ({ children }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [company, setCompany] = useState(null)
    const [customers, setCustomers] = useState([])

    const logout = () => {
        clearTokenHeader()

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
