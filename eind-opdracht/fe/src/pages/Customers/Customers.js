import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'

import { useModal } from 'components/Modal/ModalProvider'

import Table from 'components/Table/Table'
import Dropdown from 'components/Dropdown/Dropdown'
import styles from './Customers.module.scss'

const usersData = [
    { id: 1, name: 'John Do', treatment: 'treatment1', minutes: 10, pain: 'much', info: 'Blablabla' },
    { id: 2, name: 'Piet', treatment: 'treatment2', minutes: 20, pain: 'much', info: 'Blablabla' },
    { id: 3, name: 'Henk', treatment: 'treatment3', minutes: 30, pain: 'much', info: 'Blablabla' },
    { id: 5, name: 'Jan', treatment: 'treatment4', minutes: 30, pain: 'much', info: 'Blablabla' },
    { id: 6, name: 'Truus', treatment: 'treatment5', minutes: 40, pain: 'very much', info: 'Blablabla' },
    { id: 7, name: 'Sjaan', treatment: 'treatment6', minutes: 60, pain: 'very much', info: 'Blablabla' },
    { id: 4, name: 'jantje', treatment: 'treatment6', minutes: 60, pain: 'very much', info: 'Blablabla' }
]

function Customers (props) {
    const modal = useModal()

    const onDelete = (user) => {
        modal.showModal({
            title: 'Verwijderen',
            children: (
                <div>{`Weet u zeker dat u ${user.name} wilt verwijderen?`}</div>
            )
        })
    }

    const [data] = useState([...usersData].map(u => ({
        ...u,
        actions: (
            <Dropdown
                top={18}
                right={0}
                trigger={(
                    <div className={styles.dropdownTrigger}>
                        <FontAwesomeIcon icon={faEllipsisVertical} />
                    </div>
                )}
                menu={[
                    <>
                        <FontAwesomeIcon icon={faPen} />
                        <span>Wijzigen</span>
                    </>,
                    <>
                        <FontAwesomeIcon icon={faTrash} />
                        <span onClick={() => onDelete(u)}>Verwijderen</span>
                    </>
                ]}
            />
        )
    })))

    return (
        <Table
            columns={[
                { key: 'name', label: 'Naam' },
                { key: 'treatment', label: 'Behandeling' },
                { key: 'minutes', label: 'Minuten', style: { textAlign: 'right' } },
                { key: 'pain', label: 'Klacht' },
                { key: 'info', label: 'Info' },
                { key: 'actions', label: 'Acties', style: { textAlign: 'right' } }
            ]}
            data={data}
            rowsPerPage={5}
        />
    )
}

export default Customers
