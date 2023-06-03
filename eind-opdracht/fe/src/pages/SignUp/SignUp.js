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
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()

        createUser(formValues)
    }

    return (
        <AuthLayout>
            <form
                className={styles.form}
                autoComplete="off"
                onSubmit={handleFormSubmit}
            >
                <Typography variant="h5">Registreren</Typography>
                <TextField
                    label="E-mailadres"
                    value={formValues.email}
                    name="email"
                    type="email"
                    helpText="Vul hier uw e-mailadres in."
                    onChange={handleInputValueChange}
                />
                <TextField
                    label="Wachtwoord"
                    value={formValues.password}
                    name="password"
                    type="password"
                    helpText="Vul hier je wachtwoord in."
                    onChange={handleInputValueChange}
                />
                <TextField
                    label="Herhaal wachtwoord"
                    value={formValues.repeatPassword}
                    name="password"
                    type="password"
                    helpText="Vul hier je wachtwoord in."
                    onChange={handleInputValueChange}
                />
                <Button disabled={loading}>Registreren</Button>
            </form>
        </AuthLayout>
    )
}

export default SignUp
