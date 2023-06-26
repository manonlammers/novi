import React, { useState } from 'react'

import * as companyAPI from 'api/company'
import * as validationUtils from 'utils/validation'
import Typography from 'components/Typography/Typography'
import TextField from 'components/Textfield/TextField'
import Button from 'components/Button/Button'
import styles from './MyCompany.module.scss'

function MyCompany () {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const [formErrors, setFormErrors] = useState({})
    const [formValues, setFormValues] = useState({
        name: '',
        phoneNumber: '',
        email: '',
        zipCode: '',
        kvkNumber: '',
        address: '',
        city: '',
        vatNumber: ''
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

        if (!validationUtils.validateIsRequired(formValues.name)) {
            errors.name = 'Is vereist'
        }

        if (!validationUtils.validateIsRequired(formValues.phoneNumber)) {
            errors.phoneNumber = 'Is vereist'
        } else if (!validationUtils.validatePhone(formValues.phoneNumber)) {
            errors.phoneNumber = 'Ongeldige invoer'
        }

        if (!validationUtils.validateIsRequired(formValues.email)) {
            errors.email = 'Is vereist'
        } else if (!validationUtils.validateEmail(formValues.email)) {
            errors.email = 'Ongeldige invoer'
        }

        if (!validationUtils.validateIsRequired(formValues.zipCode)) {
            errors.zipCode = 'Is vereist'
        } else if (!validationUtils.validateZipcode(formValues.zipCode)) {
            errors.zipCode = 'Ongeldige invoer'
        }

        if (!validationUtils.validateIsRequired(formValues.kvkNumber)) {
            errors.kvkNumber = 'Is vereist'
        }

        if (!validationUtils.validateIsRequired(formValues.address)) {
            errors.address = 'Is vereist'
        }

        if (!validationUtils.validateIsRequired(formValues.city)) {
            errors.city = 'Is vereist'
        }

        if (!validationUtils.validateIsRequired(formValues.vatNumber)) {
            errors.vatNumber = 'Is vereist'
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
                className={styles.form}
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
                        name="phoneNumber"
                        type="text"
                        className={styles.textField}
                        value={formValues.phoneNumber}
                        error={formErrors.phoneNumber}
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
                        name="zipCode"
                        type="text"
                        className={styles.textField}
                        value={formValues.zipCode}
                        error={formErrors.zipCode}
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
                        name="vatNumber"
                        type="text"
                        className={styles.textField}
                        value={formValues.vatNumber}
                        error={formErrors.vatNumber}
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
