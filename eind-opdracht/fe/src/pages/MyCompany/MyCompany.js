import React, { useState } from 'react'
import styles from './MyCompany.module.scss'
import NavBar from 'components/NavBar/NavBar'
import * as companyAPI from 'api/company'
import TextField from 'components/Textfield/TextField'
import Button from '../../components/Button/Button'

function MyCompany () {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const createCompany = async (data) => {
        setLoading(true)
        try {
            const response = await companyAPI.createCompany(data)
            const responseData = await response.json()
            console.log(response)
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }
    const [formValues, setFormValues] = useState({
        name: '',
        phoneNumber: '',
        email: '',
        zipcode: '',
        kvkNumber: '',
        address: '',
        city: '',
        taxNumber: ''
    })

    const handleInputValueChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }
    const handleFormSubmit = (e) => {
        e.preventDefault()

        createCompany(formValues)
    }

    return (
        <>
            <form
                autoComplete="off"
                onSubmit={handleFormSubmit}
            >

                <div className={styles.row}>
                    <TextField
                        label='Bedrijfsnaam'
                        name="name"
                        type="text"
                        className={styles.textField}
                        value={formValues.name}
                        onChange={handleInputValueChange}
                    />
                    <TextField
                        label='E-mailadres'
                        name="email"
                        type="text"
                        className={styles.textField}
                        value={formValues.email}
                        onChange={handleInputValueChange}
                    />
                </div>
                <div className={styles.row}>
                    <TextField
                        label='Telefoonnummer'
                        name="phone"
                        type="text"
                        className={styles.textField}
                        value={formValues.phoneNumber}
                        onChange={handleInputValueChange}
                    />
                    <TextField
                        label='Adres'
                        name="address"
                        type="text"
                        className={styles.textField}
                        value={formValues.address}
                        onChange={handleInputValueChange}
                    />
                </div>
                <div className={styles.row}>
                    <TextField
                        label='Postcode'
                        name="zipcode"
                        type="text"
                        className={styles.textField}
                        value={formValues.zipcode}
                        onChange={handleInputValueChange}
                    />
                    <TextField
                        label='Woonplaats'
                        name="city"
                        type="text"
                        className={styles.textField}
                        value={formValues.city}
                        onChange={handleInputValueChange}
                    />
                </div>

                <div className={styles.row}>
                    <TextField
                        label='Kvk nummer'
                        name="kvkNumber"
                        type="text"
                        className={styles.textField}
                        value={formValues.kvkNumber}
                        onChange={handleInputValueChange}
                    />
                    <TextField
                        label='BTW nummer'
                        name="taxNumber"
                        type="text"
                        className={styles.textField}
                        value={formValues.taxNumber}
                        onChange={handleInputValueChange}
                    />
                </div>
                <div className={styles.submitWrapper}>
                    <Button disabled={loading} className={styles.submit}>Aanmaken</Button>
                </div>
            </form>
        </>
    )
}

export default MyCompany
