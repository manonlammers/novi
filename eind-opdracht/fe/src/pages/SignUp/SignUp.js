import React, { useState } from 'react'
import styles from './SignUp.module.scss'

import * as userAPI from 'api/user'
import * as validationUtils from 'utils/validation'
import TextField from 'components/Textfield/TextField'
import AuthLayout from 'components/AuthLayout/AuthLayout'
import Typography from 'components/Typography/Typography'
import Button from 'components/Button/Button'

function SignUp () {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const [formErrors, setFormErrors] = useState({})
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
        repeatPassword: ''
    })

    const createUser = async (data) => {
        setLoading(true)
        setError(null)

        try {
            const response = await userAPI.createUser(data)

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

    const handleFormSubmit = (e) => {
        e.preventDefault()

        const { isValid, errors } = validateFormValues(formValues)
        setFormErrors(errors)
        console.log({ isValid, errors })
        if (isValid) {
            return createUser(formValues)
        }
    }

    return (
        <AuthLayout>
            <form
                className={styles.form}
                autoComplete="off"
                onSubmit={handleFormSubmit}
                noValidate={true}
            >
                <Typography variant="h5">Registreren</Typography>
                <TextField
                    label="E-mailadres"
                    value={formValues.email}
                    error={formErrors.email}
                    name="email"
                    type="email"
                    onChange={handleInputValueChange}
                />
                <TextField
                    label="Wachtwoord"
                    value={formValues.password}
                    error={formErrors.password}
                    name="password"
                    type="password"
                    onChange={handleInputValueChange}
                />
                <TextField
                    label="Herhaal wachtwoord"
                    value={formValues.repeatPassword}
                    error={formErrors.repeatPassword}
                    name="repeatPassword"
                    type="password"
                    onChange={handleInputValueChange}
                />
                <div className={styles.submitWrapper}>
                    {error && (
                        <Typography className={styles.submitError}>{error}</Typography>
                    )}
                    <Button disabled={loading} className={styles.submitButton}>Registeren</Button>
                </div>
            </form>
        </AuthLayout>
    )
}

export default SignUp
