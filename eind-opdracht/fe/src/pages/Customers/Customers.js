import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

import * as customerAPI from 'api/customer'
import * as Routes from 'constants/Routes'
import { useUser } from 'components/UserProvider/UserProvider'
import { useModal } from 'components/Modal/ModalProvider'

import Table from 'components/Table/Table'
import Dropdown from 'components/Dropdown/Dropdown'
import Button from 'components/Button/Button'
import styles from './Customers.module.scss'

function Customers () {
    const navigate = useNavigate()
    const modal = useModal()
    const { user } = useUser()

    const [customers, setCustomers] = useState([])

    const fetchCustomers = async () => {
        if (!user?.company?.id) return

        try {
            const response = await customerAPI.getAllCustomersByCompanyId(user?.company?.id)
            const allCustomers = await response.json()
            if (response.status !== 200) {
                // TODO: show pretty error alert component
                return
            }
            setCustomers(allCustomers)
        } catch (e) {
            console.log(e)
            // TODO: show pretty error alert component
        }
    }

    useEffect(() => {
        fetchCustomers()
        /* eslint-disable-next-line */
    }, [])

    const onDelete = (customer) => {
        modal.showModal({
            title: 'Verwijderen',
            children: (
                <div>{`Weet u zeker dat u ${customer.name} wilt verwijderen?`}</div>
            ),
            onConfirm: async () => {
                try {
                    const response = await customerAPI.deleteCustomer(customer.id)
                    if (response.status !== 200) return

                    const newCustomers = [...customers].filter(c => c.id !== customer.id)
                    setCustomers(newCustomers)
                    modal.hideModal()
                } catch (e) {
                    console.log(e)
                }
            }
        })
    }

    const handleUpdateCustomer = (customer) => {
        navigate(`${Routes.CUSTOMER}/${customer.id}`)
    }

    const handleNewCustomer = () => {
        navigate(Routes.CUSTOMER)
    }

    return (
        <>
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
                                    <div onClick={() => handleUpdateCustomer(c)}>
                                        <FontAwesomeIcon icon={faPen} />
                                        <span>Wijzigen</span>
                                    </div>,
                                    <div>
                                        <FontAwesomeIcon className={styles.delete} icon={faTrash}/>
                                        <span onClick={() => onDelete(c)}>Verwijderen</span>
                                    </div>
                                ]}
                            />
                        )
                    }
                })}
                rowsPerPage={5}
            />
            <div className={styles.buttonWrapper}>
                <Button className={styles.button} onClick={handleNewCustomer}>Aanmaken klant</Button>
            </div>
        </>
    )
}

export default Customers
