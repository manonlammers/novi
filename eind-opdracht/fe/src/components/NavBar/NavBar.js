import React from 'react'
import { Link } from 'react-router-dom'
import styles from './NavBar.module.scss'

import * as Routes from 'constants/Routes'
import { ADMIN } from 'constants/UserRoles'
import { useUser } from '../UserProvider/UserProvider'

function NavBar () {
    const { user, logout } = useUser()
    const isCompanyConfigured = !user?.company?.isConfigured || false

    return (
        <div className={styles.navbar}>
            {user?.role === ADMIN
                ? (
                    <Link to={Routes.USERS}>Gebruikers</Link>
                )
                : (
                    <>
                        <Link className={styles.link} to={Routes.CUSTOMERS} disabled={isCompanyConfigured}>KBS</Link>
                        <Link className={styles.link} to={Routes.MY_COMPANY}><span>Bedrijf</span></Link>
                        <Link className={styles.link} to={Routes.ACCOUNT}><span>Account</span></Link>
                    </>
                )}
            <a className={styles.link} onClick={logout}>Uitloggen</a>
        </div>
    )
}

export default NavBar
