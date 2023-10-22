import React, { useEffect } from 'react'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'

import {
    HOME,
    LOGIN,
    SIGN_UP,
    CUSTOMERS,
    CUSTOMER,
    MY_COMPANY,
    USERS
} from 'constants/Routes'
import { ADMIN } from 'constants/UserRoles'
import { useUser } from 'components/UserProvider/UserProvider'

import DashboardLayout from 'components/DashboardLayout/DashboardLayout'
import Login from 'pages/Login/Login'
import SignUp from 'pages/SignUp/SignUp'
import MyCompany from 'pages/MyCompany/MyCompany'
import Components from 'pages/Components/Components'
import Customers from 'pages/Customers/Customers'
import Customer from 'pages/Customer/Customer'
import Users from 'pages/Users/Users'

function App () {
    const navigate = useNavigate()
    const location = useLocation()
    const { user } = useUser()

    useEffect(() => {
        if (
            location.pathname === LOGIN ||
            location.pathname === SIGN_UP
        ) {
            return
        }

        if (!user) {
            return navigate(LOGIN)
        }

        if (user?.role === ADMIN) {
            return navigate(USERS)
        }

        if (!user?.company?.isConfigured) {
            return navigate(MY_COMPANY)
        }
    }, [navigate, location.pathname, user])

    return (
        <Routes>
            <Route path={LOGIN} element={<Login />} />
            <Route path={SIGN_UP} element={<SignUp />} />
            <Route path={HOME} element={<DashboardLayout />}>
                <Route path={MY_COMPANY} element={<MyCompany />} />
                <Route path={CUSTOMERS} element={<Customers />} />
                <Route path={CUSTOMER} element={<Customer />} />
                <Route path={`${CUSTOMER}/:id`} element={<Customer/>} />
                <Route path={USERS} element={<Users />} />
            </Route>

            <Route path="/components" element={<Components />} />
        </Routes>
    )
}

export default App
