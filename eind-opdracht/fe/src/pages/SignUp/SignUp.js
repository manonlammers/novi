import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import * as userAPI from 'api/user'
import * as validationUtils from 'utils/validation'
import * as Routes from 'constants/Routes'
import * as Errors from 'constants/Errors'
import { useUser } from 'components/UserProvider/UserProvider'

import TextField from 'components/Textfield/TextField'
import AuthLayout from 'components/AuthLayout/AuthLayout'
import Typography from 'components/Typography/Typography'
import Button from 'components/Button/Button'
import styles from './SignUp.module.scss'

function SignUp () {
    const navigate = useNavigate()
    const { setUser } = useUser()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [formErrors, setFormErrors] = useState({})
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
        repeatPassword: ''
    })

    const signUp = async (formData) => {
        const data = { ...formData }
        setLoading(true)
        setError(null)

        try {
            delete data.repeatPassword
            const response = await userAPI.createUser(data)

            if (response.status === 409) {
                return setError(Errors.ERROR_ACCOUNT_ALREADY_EXISTS)
            }
            if (response.status !== 200) {
                return setError(Errors.ERROR_OOPS)
            }

            const user = await response.json()
            setUser(user)
            // TODO: show pretty success alert component
            window.alert('Je account is succesvol geregistreerd. Nu kan je je aanmelden.')
            navigate(Routes.LOGIN)
        } catch (e) {
            console.log(e)
            return setError(Errors.ERROR_OOPS)
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
        if (isValid) {
            return signUp(formValues)
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
                    <Button disabled={loading} className={styles.submitButton}>Registeren</Button>
                </div>
                <Link to={Routes.LOGIN} className={styles.loginLink}>
                    Al een account? Login!
                </Link>
            </form>
        </AuthLayout>
    )
}

export default SignUp
