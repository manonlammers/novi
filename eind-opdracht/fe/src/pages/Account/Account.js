import React, { useState } from 'react'

import * as userAPI from 'api/user'
import * as Errors from 'constants/Errors'
import * as validationUtils from 'utils/validation'
import { useUser } from 'components/UserProvider/UserProvider'

import AvatarImage from 'components/AvatarImage/AvatarImage'
import Typography from 'components/Typography/Typography'
import TextField from 'components/Textfield/TextField'
import Button from 'components/Button/Button'
import styles from './Account.module.scss'

function Account () {
    const { user, setUser } = useUser()

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [formErrors, setFormErrors] = useState({})
    const [formValues, setFormValues] = useState({
        ...user,
        password: '',
        repeatPassword: ''
    })

    const handleInputValueChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    const validateFormValues = (formValues) => {
        const errors = {}

        if (!validationUtils.validateIsRequired(formValues.email)) {
            errors.email = 'Is vereist'
        } else if (!validationUtils.validateEmail(formValues.email)) {
            errors.email = 'Ongeldige invoer'
        }

        if (!validationUtils.validateIsRequired(formValues.password)) {
            errors.password = 'Is vereist'
        } else if (!validationUtils.validatePassword(formValues.password)) {
            errors.password = 'Wachtwoord is niet sterk genoeg (6 tekens, 1 cijfer en 1 vreemd teken vereist)'
        }

        if (!validationUtils.validateIsRequired(formValues.repeatPassword)) {
            errors.repeatPassword = 'Is vereist'
        } else if (formValues.repeatPassword !== formValues.password) {
            errors.repeatPassword = 'Wachtwoord komt niet overeen'
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
            const data = { ...formValues }
            delete data.repeatPassword

            const response = await userAPI.updateUser(data)
            if (response.status !== 200) {
                // TODO: show pretty error alert component
            }
            setUser(response.data)
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
                    Vul uw accountgegevens in
                </Typography>
            </div>
            <form
                className={styles.form}
                onSubmit={handleFormSubmit}
            >
                <AvatarImage className={styles.avatarImage} />
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
                <TextField
                    label="Wachtwoord"
                    name="password"
                    type="password"
                    disabled={loading}
                    value={formValues.password}
                    error={formErrors.password}
                    onChange={handleInputValueChange}
                />
                <TextField
                    label="Herhaal wachtwoord"
                    name="repeatPassword"
                    type="password"
                    disabled={loading}
                    value={formValues.repeatPassword}
                    error={formErrors.repeatPassword}
                    onChange={handleInputValueChange}
                />
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

export default Account
