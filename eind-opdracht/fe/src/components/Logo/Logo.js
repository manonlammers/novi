import React from 'react'
import logo from 'assets/connection-icon-png-11.jpeg'

function Logo () {
    return (
        <div className="login__wrapper">
            <div className="logo">
                <img src={logo} alt="logo"/>
                <h1>KBS</h1>
            </div>
        </div>
    )
}

export default Logo
