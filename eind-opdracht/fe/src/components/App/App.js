import React from 'react'
import { Route, Routes } from 'react-router-dom'

import {
    HOME,
    LOGIN,
    SIGN_UP,
    CUSTOMERS,
    CUSTOMER,
    MY_COMPANY,
    USERS
} from 'constants/Routes'

import DashboardLayout from 'components/DashboardLayout/DashboardLayout'
import Login from 'pages/Login/Login'
import SignUp from 'pages/SignUp/SignUp'
import MyCompany from 'pages/MyCompany/MyCompany'
import Components from 'pages/Components/Components'
import Customers from 'pages/Customers/Customers'
import Customer from 'pages/Customer/Customer'
import Users from 'pages/Users/Users'

function App () {
    return (
        <Routes>
            <Route path={LOGIN} element={<Login />} />
            <Route path={SIGN_UP} element={<SignUp />} />
            <Route path={HOME} element={<DashboardLayout />}>
                <Route path={MY_COMPANY} element={<MyCompany />} />
                <Route path={CUSTOMERS} element={<Customers />} />
                <Route path={CUSTOMER} element={<Customer />} />
                <Route path={USERS} element={<Users />} />
            </Route>

            <Route path="/components" element={<Components />} />
        </Routes>
    )
}

export default App
