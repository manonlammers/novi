import React from 'react'
import PropTypes from 'prop-types'
import styles from './AuthLayout.module.scss'
import logo from 'assets/connection-icon-png-11.jpeg'

function AuthLayout ({ children }) {
    return (
        <div className={styles.authLayout}>
            <div className={styles.logoWrapper}>
                <img className={styles.logo} src={logo} />
                <div className={styles.logoText}>KBS</div>
            </div>
            <div className={styles.formWrapper}>
                {children}
            </div>
        </div>

    )
}

AuthLayout.propTypes = {
    children: PropTypes.node
}

export default AuthLayout
