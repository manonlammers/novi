import React, { useState } from 'react'
import styles from './Login.module.scss'
import { Link, useNavigate } from 'react-router-dom'

import * as userAPI from 'api/user'
import * as validationUtils from 'utils/validation'
import * as Routes from 'constants/Routes'

import AuthLayout from 'components/AuthLayout/AuthLayout'
import TextField from 'components/Textfield/TextField'
import Button from 'components/Button/Button'
import Typography from 'components/Typography/Typography'

function Login () {
    const navigate = useNavigate()
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const [formErrors, setFormErrors] = useState({})
    const [formValues, setFormValues] = useState({
        email: '',
        password: ''
    })

    const login = async (data) => {
        setLoading(true)
        setError(null)

        try {
            const response = await userAPI.login(data)
            // TODO: handle response.status 404
            // TODO: test by: entering not existing user by email
            // TODO: test by: entering not existing user by password
            if (response.status >= 400) {
                return setError('Oeps, er ging iets fout')
            }
            if (response.status === 404) {
                return setError('Dit email-adres bestaat niet, registreer')
            }

            // TODO: redirect to: CMS?
            navigate(Routes.MY_COMPANY)
        } catch (e) {
            console.log(e)
            return setError('Oeps, er ging iets fout')
        } finally {
            setLoading(false)
        }
    }

    const handleInputValueChange = (e) => {
        const { name, value } = e.target
        setFormValues({ ...formValues, [name]: value })
    }

    const validateFormValues = (formValues) => {
        const errors = {}

        if (!validationUtils.validateIsRequired(formValues.email)) {
            errors.email = 'Is vereist'
        }

        if (!validationUtils.validateIsRequired(formValues.password)) {
            errors.password = 'Is vereist'
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

        if (isValid) {
            return login(formValues)
        }
    }

    return (
        <AuthLayout>
            <form
                className={styles.form}
                autoComplete="off"
                onSubmit={handleFormSubmit}
                noValidate
            >
                <Typography variant="h5">Inloggen</Typography>
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
                <div className={styles.submitWrapper}>
                    {error && (
                        <Typography className={styles.submitError}>{error}</Typography>
                    )}
                    <Button disabled={loading} className={styles.submitButton}>Inloggen</Button>
                </div>
                <Link to={Routes.SIGN_UP} className={styles.link}>
                    Nog geen account? Registreer!
                </Link>
            </form>
        </AuthLayout>
    )
}

export default Login
