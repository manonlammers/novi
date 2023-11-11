import React, { useState } from 'react'
import styles from './Login.module.scss'
import { useNavigate, Link } from 'react-router-dom'

import * as authAPI from 'api/auth'
import * as validationUtils from 'utils/validation'
import { setTokenHeader } from 'utils/request'
import * as Routes from 'constants/Routes'
import * as Errors from 'constants/Errors'
import { useUser } from 'components/UserProvider/UserProvider'

import AuthLayout from 'components/AuthLayout/AuthLayout'
import TextField from 'components/Textfield/TextField'
import Button from 'components/Button/Button'
import Typography from 'components/Typography/Typography'

function Login () {
    const navigate = useNavigate()
    const { setUser } = useUser()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [formErrors, setFormErrors] = useState({})
    const [formValues, setFormValues] = useState({
        email: '',
        password: ''
    })

    const login = async (data) => {
        setLoading(true)
        setError(null)

        try {
            const userResponse = await authAPI.login(data)
            if (userResponse.status === 401) {
                return setError(Errors.ERROR_ACCOUNT_DOES_NOT_EXIST)
            }

            const { token, user } = await userResponse.json()
            setTokenHeader(token)
            setUser(user)
            navigate(Routes.CUSTOMERS)
        } catch (e) {
            console.log(e)
            return setError(Errors.ERROR_OOPS)
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
                    name="email"
                    type="email"
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
