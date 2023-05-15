import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Login from 'pages/Login/Login'
import SignUp from 'pages/SignUp/SignUp'
import MyCompany from 'pages/MyCompany/MyCompany'
import {
    HOME,
    LOGIN,
    SIGN_UP,
    CUSTOMERS,
    MY_COMPANY
} from 'constants/Routes'
import ClientDashboard from 'pages/ClientDashboard/ClientDashboard'
import Components from 'pages/Components/Components'
import DashboardLayout from '../DashboardLayout/DashboardLayout'
import Customers from '../../pages/Customers/Customers'

function App () {
    return (
        <Routes>
            <Route path={LOGIN} element={<Login />} />
            <Route path={SIGN_UP} element={<SignUp />} />
            <Route path={HOME} element={<DashboardLayout />}>
                <Route path={MY_COMPANY} element={<MyCompany />} />
                <Route path={CUSTOMERS} element={<Customers/>} />
            </Route>

            <Route path="/components" element={<Components />} />
        </Routes>
    )
}

export default App
