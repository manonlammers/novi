/* eslint-disable */
import React, { useState } from 'react'
import Table from 'components/Table/Table'
import Modal from "components/Modal/Modal";

const usersInfo = [
    {
        id: 1,
        name: 'Klaas',
        email: 'blabla@info.nl',
        phone: '61111111',
        adres: 'blablabla',
        postcode: 3920,
        city: 'lommel',
        kvk: 19239812,
        btw: 9894234,
        // actions: <div>actions</div>
    },
    {
        id: 2,
        name: 'Piet',
        email: 'blabla@info.nl',
        phone: '61111111',
        adres: 'blablabla',
        postcode: 3930,
        city: 'lommel',
        kvk: 19239812,
        btw: 9894234
    }

]

function Users (props) {
    const [users] = useState([...usersInfo])
    return (
        <>
            <Table
                columns={[
                    // { key: 'actions', label: 'acties' },
                    { key: 'name', label: 'Bedrijfsnaam' },
                    { key: 'email', label: 'E-mailadres' },
                    { key: 'phone', label: 'Telefoonnummer', style: { textAlign: 'right' } },
                    { key: 'adres', label: 'Adres' },
                    { key: 'postcode', label: 'Postcode', style: { textAlign: 'right' } },
                    { key: 'city', label: 'Woonplaats' },
                    { key: 'kvk', label: 'Kvk-nummer', style: { textAlign: 'right' } },
                    { key: 'btw', label: 'BTW-nummer', style: { textAlign: 'right' } },
                ]}
                data={users}
                rowsPerPage={5}
                actions={(<div>Actions tests </div>)}
            />
            {/*<Modal/>*/}
        </>
    )
}

export default Users
