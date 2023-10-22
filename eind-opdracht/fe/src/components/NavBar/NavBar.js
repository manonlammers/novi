import React from 'react'
import { Link } from 'react-router-dom'
import styles from './NavBar.module.scss'

import * as Routes from 'constants/Routes'
import { ADMIN } from 'constants/UserRoles'
import { useUser } from '../UserProvider/UserProvider'

function NavBar () {
    const { user, logout } = useUser()

    return (
        <div className={styles.navbar}>
            {user?.role === ADMIN
                ? (
                    <Link to={Routes.USERS}>Gebruikers</Link>
                )
                : (
                    <>
                        <Link to={Routes.CUSTOMERS}>KBS</Link>
                        <Link to={Routes.MY_COMPANY}><span>Bedrijf</span></Link>
                        <Link style={{ opacity: 0.5, pointerEvents: 'none' }} to={Routes.ACCOUNT}><span>Account</span></Link>
                    </>
                )}
            <a onClick={logout}>Uitloggen</a>
        </div>
    )
}

export default NavBar
