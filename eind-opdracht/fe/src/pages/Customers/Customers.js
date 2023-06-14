import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

import * as companyAPI from '../../api/customer'
import * as Routes from 'constants/Routes'

import { useModal } from 'components/Modal/ModalProvider'
import Table from 'components/Table/Table'
import Dropdown from 'components/Dropdown/Dropdown'
import styles from './Customers.module.scss'

function Customers () {
    const navigate = useNavigate()
    const modal = useModal()
    const [customers, setCustomers] = useState([])

    useEffect(() => {
        async function fetchCustomers () {
            const response = await companyAPI.getAllCustomers()
            const allCustomers = await response.json()
            setCustomers(allCustomers)
        }

        fetchCustomers()
    }, [])

    const onDelete = (customer) => {
        modal.showModal({
            title: 'Verwijderen',
            children: (
                <div>{`Weet u zeker dat u ${customer.name} wilt verwijderen?`}</div>
            )
        })
    }

    const onClickCustomer = (customer) => {
        navigate(`${Routes.CUSTOMER}/${customer.id}`)
    }

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
            data={customers.map(c => {
                return {
                    ...c,
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
                                    <FontAwesomeIcon icon={faPen}/>
                                    <span>Wijzigen</span>
                                </>,
                                <>
                                    <FontAwesomeIcon className={styles.delete} icon={faTrash}/>
                                    <span onClick={() => onDelete(c)}>Verwijderen</span>
                                </>
                            ]}
                        />
                    )
                }
            })}
            rowsPerPage={5}
            onRowClick={(c) => onClickCustomer(c)}
        />
    )
}

export default Customers
