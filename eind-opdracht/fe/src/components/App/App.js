import React from "react";
import { Route, Routes } from "react-router-dom";

import Login from "pages/Login/Login";
import SignUp from "pages/SignUp/SignUp";
import Dashboard from "pages/Dashboard/Dashboard";
import {
    LOGIN,
    SIGN_UP,
    DASHBOARD
} from "constants/Routes";

function App() {
  return (
    <Routes>
        <Route path={LOGIN} element={<Login />} />
        <Route path={SIGN_UP} element={<SignUp />} />
        <Route path={DASHBOARD} element={<Dashboard />} />
    </Routes>
  );
}

export default App;
