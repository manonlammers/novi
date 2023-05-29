import React, { useState } from 'react'
import Table from 'components/Table/Table'

const usersInfo = [
    { id: 1, name: 'John Do', treatment: 'treatment1', minutes: 10, pain: 'much', info: 'Blablabla' },
    { id: 2, name: 'Piet', treatment: 'treatment2', minutes: 20, pain: 'much', info: 'Blablabla' },
    { id: 3, name: 'Henk', treatment: 'treatment3', minutes: 30, pain: 'much', info: 'Blablabla' },
    { id: 5, name: 'Jan', treatment: 'treatment4', minutes: 30, pain: 'much', info: 'Blablabla' },
    { id: 6, name: 'Truus', treatment: 'treatment5', minutes: 40, pain: 'very much', info: 'Blablabla' },
    { id: 7, name: 'Sjaan', treatment: 'treatment6', minutes: 60, pain: 'very much', info: 'Blablabla' },
    { id: 4, name: 'jantje', treatment: 'treatment6', minutes: 60, pain: 'very much', info: 'Blablabla' }
]

function Customers (props) {
    const [users] = useState([...usersInfo])
    return (
        <Table
            columns={[
                { key: 'name', label: 'Naam' },
                { key: 'treatment', label: 'Behandeling' },
                { key: 'minutes', label: 'Minuten', style: { textAlign: 'right' } },
                { key: 'pain', label: 'Klacht' },
                { key: 'info', label: 'Info' }
            ]}
            data={users}
            rowsPerPage={5}
        />
    )
}

export default Customers
