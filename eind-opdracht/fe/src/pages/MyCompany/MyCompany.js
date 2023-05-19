import React, { useState } from 'react'
import styles from './MyCompany.module.scss'

import * as companyAPI from 'api/company'
import Typography from 'components/Typography/Typography'
import TextField from 'components/Textfield/TextField'
import Button from 'components/Button/Button'

function MyCompany () {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const [formErrors, setFormErrors] = useState({})
    const [formValues, setFormValues] = useState({
        name: '',
        phone: '',
        email: '',
        zipcode: '',
        kvkNumber: '',
        address: '',
        city: '',
        taxNumber: ''
    })

    const createCompany = async (data) => {
        setLoading(true)
        setError(null)

        try {
            const response = await companyAPI.createCompany(data)

            if (response.status >= 400) {
                return setError('Oeps, er ging iets fout')
            }
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    const handleInputValueChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    const validateFormValues = (formValues) => {
        const errors = {}

        if (!formValues.name) {
            errors.name = 'Is vereist.'
        }

        if (!formValues.phone) {
            errors.phone = 'Is vereist.'
        } else if (!formValues.phone.match(/(^\+[0-9]{2}|^\+[0-9]{2}\(0\)|^\(\+[0-9]{2}\)\(0\)|^00[0-9]{2}|^0)([0-9]{9}$|[0-9\-\s]{10}$)/)) {
            errors.phone = 'Incorrect formaat.'
        }

        if (!formValues.email) {
            errors.email = 'Is vereist.'
        } else if (!formValues.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            errors.email = 'Incorrect formaat.'
        }

        if (!formValues.zipcode) {
            errors.zipcode = 'Is vereist.'
        } else if (!formValues.zipcode.match(/^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i)) {
            errors.zipcode = 'Incorrect formaat.'
        }

        if (!formValues.kvkNumber) {
            errors.kvkNumber = 'Is vereist.'
        }

        if (!formValues.address) {
            errors.address = 'Is vereist.'
        }

        if (!formValues.city) {
            errors.city = 'Is vereist.'
        }

        if (!formValues.taxNumber) {
            errors.taxNumber = 'Is vereist.'
        }

        const isValid = Object.keys(errors).length === 0

        return {
            isValid,
            errors
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()

        const { isValid, errors } = validateFormValues(formValues)
        setFormErrors(errors)
        console.log({ isValid, errors })
        if (isValid) {
            return createCompany(formValues)
        }
    }

    return (
        <>
            <form
                onSubmit={handleFormSubmit}
            >
                <div className={styles.row}>
                    <TextField
                        label='Bedrijfsnaam'
                        name="name"
                        type="text"
                        className={styles.textField}
                        value={formValues.name}
                        error={formErrors.name}
                        onChange={handleInputValueChange}
                    />
                    <TextField
                        label='E-mailadres'
                        name="email"
                        type="text"
                        className={styles.textField}
                        value={formValues.email}
                        error={formErrors.email}
                        onChange={handleInputValueChange}
                    />
                </div>
                <div className={styles.row}>
                    <TextField
                        label='Telefoonnummer'
                        name="phone"
                        type="text"
                        className={styles.textField}
                        value={formValues.phone}
                        error={formErrors.phone}
                        onChange={handleInputValueChange}
                    />
                    <TextField
                        label='Adres'
                        name="address"
                        type="text"
                        className={styles.textField}
                        value={formValues.address}
                        error={formErrors.address}
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
                        error={formErrors.zipcode}
                        onChange={handleInputValueChange}
                    />
                    <TextField
                        label='Woonplaats'
                        name="city"
                        type="text"
                        className={styles.textField}
                        value={formValues.city}
                        error={formErrors.city}
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
                        error={formErrors.kvkNumber}
                        onChange={handleInputValueChange}
                    />
                    <TextField
                        label='BTW nummer'
                        name="taxNumber"
                        type="text"
                        className={styles.textField}
                        value={formValues.taxNumber}
                        error={formErrors.taxNumber}
                        onChange={handleInputValueChange}
                    />
                </div>
                <div className={styles.submitWrapper}>
                    {error && (
                        <Typography className={styles.submitError}>{error}</Typography>
                    )}
                    <Button disabled={loading} className={styles.submitButton}>Opslaan</Button>
                </div>
            </form>
        </>
    )
}

export default MyCompany
