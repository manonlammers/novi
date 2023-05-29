import React from 'react'
import './ClientDasboard.css'
import NavBar from 'components/NavBar/NavBar'
import Table from 'components/Table/Table'

const users = [
    { name: 'John Do', treatment: 'treatment1', minutes: 60, pain: 'very much', info: 'Blablabla' }
]

const userTableHeaders = [
    'Naam',
    'Behandeling',
    'Duur',
    'Klacht',
    'Informatie'
]

function ClientDashboard () {
    console.log({ users, userTableHeaders })
    return (
        <Table theadData={userTableHeaders} tbodyData={users} />
    )

    return (
        <>
            <div className="clientdashboard__wrapper">
                <NavBar/>
                <div className="clientdashboard">
                    <div
                        className="clientdashboard__container"
                    >
                        <Table theadData={userTableHeaders} tbodyData={users} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ClientDashboard
