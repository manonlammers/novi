import React from 'react'
import { Link } from 'react-router-dom'
import styles from './NavBar.module.scss'

import * as Routes from 'constants/Routes'
import { useUser } from '../UserProvider/UserProvider'

function NavBar () {
    const { logout } = useUser()

    return (
        <div className={styles.navbar}>
            <Link to={Routes.CUSTOMERS}>KBS</Link>
            <Link to={Routes.MY_COMPANY}><span>Bedrijf</span></Link>
            <Link style={{ opacity: 0.5, pointerEvents: 'none' }} to={Routes.ACCOUNT}><span>Account</span></Link>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a onClick={logout}>Uitloggen</a>
        </div>
    )
}

export default NavBar
