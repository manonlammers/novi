import React from 'react'
import './ClientDasboard.css'
import NavBar from 'components/NavBar/NavBar'
import ClientTable from 'components/ClientTable/ClientTable'

function ClientDashboard () {
    return (
        <>
            <div className="clientdashboard__wrapper">
                <NavBar/>
                <div className="clientdashboard">
                    <div
                        className="clientdashboard__container"
                    >
                        {/*<TextInput*/}
                        {/*    name={'Zoeken..'}*/}
                        {/*/>*/}
                        <ClientTable/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ClientDashboard
