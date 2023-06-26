/* eslint-disable */
import React, {useEffect, useState} from 'react'
import { useNavigate}  from 'react-router-dom'

import * as userAPI from 'api/user'
import * as Routes from 'constants/Routes'

import { useModal } from 'components/Modal/ModalProvider'

import Table from 'components/Table/Table'
import Dropdown from "../../components/Dropdown/Dropdown";
import styles from "../Customers/Customers.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsisVertical, faPen, faTrash} from "@fortawesome/free-solid-svg-icons";

function Users () {
    const navigate = useNavigate()
    const model = useModal()
    const [users, setUsers] = useState([])

    const fetchUsers = async () => {
        const response = await userAPI.getAllUsers()
        const allUsers = await response.json()
        setUsers(allUsers)
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
                    await userAPI.deleteUser(user.email)
                    const newUser = [...users].filter(u => u.email === user.email)
                    setUsers(newUser)
                    model.hideModal()
                } catch (e) {
                    console.log(e)
                }
            }
        })
    }

    return (
        <>
            <Table
                columns={[
                    // { key: 'actions', label: 'acties' },
                    { key: 'user', label: 'Gebruiker' },
                    { key: 'name', label: 'Bedrijfsnaam' },
                    { key: 'email', label: 'E-mailadres' },
                    { key: 'phone', label: 'Telefoonnummer', style: { textAlign: 'right' } },
                    { key: 'adres', label: 'Adres' },
                    { key: 'postcode', label: 'Postcode', style: { textAlign: 'right' } },
                    { key: 'city', label: 'Woonplaats' },
                    { key: 'kvk', label: 'Kvk-nummer', style: { textAlign: 'right' } },
                    { key: 'btw', label: 'BTW-nummer', style: { textAlign: 'right' } },
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
