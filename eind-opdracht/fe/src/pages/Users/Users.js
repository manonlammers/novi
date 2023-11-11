import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical, faTrash } from '@fortawesome/free-solid-svg-icons'

import * as adminAPI from 'api/admin'
import { useModal } from 'components/Modal/ModalProvider'

import Table from 'components/Table/Table'
import Dropdown from 'components/Dropdown/Dropdown'
import styles from './Users.module.scss'

function Users () {
    const navigate = useNavigate()
    const model = useModal()
    const [users, setUsers] = useState([])

    const fetchUsers = async () => {
        try {
            const response = await adminAPI.getAllUsers()
            if (response.status !== 200) {
                // TODO: show pretty error alert component
                return
            }
            const allUsers = await response.json()
            setUsers(allUsers)
            setUsers(allUsers.map(u => {
                if (u?.company?.isConfigured) {
                    return {
                        ...u,
                        name: u.company.name,
                        contact: `Email:${u.company.email}, Telefoon:${u.company.phone}`,
                        address: `${u.company.address}, ${u.company.zipCode}, ${u.company.city}`,
                        vatNumber: u.company.vatNumber,
                        kvkNumber: u.company.kvkNumber
                    }
                }

                return {
                    ...u,
                    name: '-',
                    contact: '-',
                    address: '-',
                    vatNumber: '-',
                    kvkNumber: '-'
                }
            }))
        } catch (e) {
            console.log(e)
            // TODO: show pretty error alert component
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    const onDelete = (user) => {
        model.showModal({
            title: 'Verwijderen',
            children: (
                <div>{`Weet u zeker dat u ${user.email} wilt verwijderen?`}</div>
            ),
            onConfirm: async () => {
                try {
                    const response = await adminAPI.deleteUser(user.id)
                    if (response.status !== 204) {
                        // TODO: show pretty error alert component
                        return
                    }
                    const newUser = [...users].filter(u => u.id !== user.id)
                    setUsers(newUser)
                    model.hideModal()
                } catch (e) {
                    console.log(e)
                    // TODO: show pretty error alert component
                }
            }
        })
    }

    return (
        <>
            <Table
                columns={[
                    { key: 'email', label: 'Gebruiker email' },
                    { key: 'name', label: 'Bedrijfsnaam' },
                    { key: 'contact', label: 'Contact' },
                    { key: 'address', label: 'Adres' },
                    { key: 'kvkNumber', label: 'Kvk-nummer', style: { textAlign: 'right' } },
                    { key: 'vatNumber', label: 'BTW-nummer', style: { textAlign: 'right' } },
                    { key: 'actions', label: 'acties' }
                ]}
                data={users.map(u => {
                    return {
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
                                    <div>
                                        <FontAwesomeIcon className={styles.delete} icon={faTrash}/>
                                        <span onClick={() => onDelete(u)}>Verwijderen</span>
                                    </div>
                                ]}
                            />
                        )
                    }
                })}
                rowsPerPage={5}
            />
        </>
    )
}

export default Users
