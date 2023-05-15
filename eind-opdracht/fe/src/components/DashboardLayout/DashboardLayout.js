import React from 'react'
import styles from './DashboardLayout.module.scss'
import { Outlet } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'

function DashboardLayout () {
    return (
        <div className={styles.wrapper}>
            <NavBar />
            <div className={styles.dashboard}>
                <Outlet />
            </div>
        </div>
    )
}

export default DashboardLayout
