import React, { useState } from 'react'

import * as companyAPI from 'api/company'
import * as Errors from 'constants/Errors'
import * as validationUtils from 'utils/validation'
import { useUser } from 'components/UserProvider/UserProvider'

import Typography from 'components/Typography/Typography'
import TextField from 'components/Textfield/TextField'
import Button from 'components/Button/Button'
import styles from './MyCompany.module.scss'

function MyCompany () {
    const { user, setUser } = useUser()

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
        vatNumber: '',
        ...user?.company
    })

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

        if (!validationUtils.validateIsRequired(formValues.phone)) {
            errors.phone = 'Is vereist'
        } else if (!validationUtils.validatePhone(formValues.phone)) {
            errors.phone = 'Ongeldige invoer'
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

    const handleFormSubmit = async (e) => {
        e.preventDefault()

        const { isValid, errors } = validateFormValues(formValues)
        setFormErrors(errors)
        if (!isValid) return

        setLoading(true)
        setError(null)

        try {
            const response = await companyAPI.updateOrCreateCompany(formValues)
            if (response.status !== 200) {
                return setError(Errors.ERROR_OOPS)
            }

            const updatedCompany = await response.json()
            const didConfigure = !user.company.isConfigured && updatedCompany.isConfigured
            setFormValues(updatedCompany)
            setUser({ ...user, company: updatedCompany })

            // TODO: show pretty success alert component
            if (didConfigure) {
                window.alert('Je bent helemaal klaar met het opzetten van all informatie. Tijd om je klanten te gaan beheren! Klik op "KBS" in het menu om verder te gaan.')
            }
        } catch (e) {
            setError(Errors.ERROR_OOPS)
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className={styles.pageHeading}>
                <Typography variant="subtitle1">
                    Vul uw bedrijfsgegevens in
                </Typography>
                {!user?.company?.isConfigured && (
                    <Typography variant="body1" gutterBottom>
                        Vertel ons wat meer over uw bedrijf voordat u verder kunt gaan met het beheren van uw klanten systeem.
                    </Typography>
                )}
            </div>
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
                        disabled={loading}
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
                        disabled={loading}
                        className={styles.textField}
                        value={formValues.phone}
                        error={formErrors.phone}
                        onChange={handleInputValueChange}
                    />
                    <TextField
                        label='Adres'
                        name="address"
                        type="text"
                        disabled={loading}
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
                        disabled={loading}
                        className={styles.textField}
                        value={formValues.zipCode}
                        error={formErrors.zipCode}
                        onChange={handleInputValueChange}
                    />
                    <TextField
                        label='Woonplaats'
                        name="city"
                        type="text"
                        disabled={loading}
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
                        disabled={loading}
                        className={styles.textField}
                        value={formValues.kvkNumber}
                        error={formErrors.kvkNumber}
                        onChange={handleInputValueChange}
                    />
                    <TextField
                        label='BTW nummer'
                        name="vatNumber"
                        type="text"
                        disabled={loading}
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
