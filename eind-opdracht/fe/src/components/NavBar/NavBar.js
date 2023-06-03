import React, { useState } from 'react'
import './NavBar.css'
import styles from './NavBar.module.scss'

import * as Routes from 'constants/Routes'

function NavBar () {
    return (
        <div className={styles.navbar}>
            <a href={Routes.CUSTOMERS}>KBS</a>
            <a href={Routes.ACCOUNT}>Account</a>
            <a href={Routes.MY_COMPANY}>Bedrijf</a>
            <a href={Routes.SIGN_OUT}>Uitloggen</a>
        </div>
    )
}

export default NavBar
