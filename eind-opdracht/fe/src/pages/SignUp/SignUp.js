import React, { useState } from 'react'
import styles from './SignUp.module.scss'
import * as userAPI from 'api/user'
import TextField from 'components/Textfield/TextField'
import AuthLayout from 'components/AuthLayout/AuthLayout'
import Typography from 'components/Typography/Typography'
import Button from 'components/Button/Button'

function SignUp () {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const createUser = async (data) => {
        setLoading(true)
        try {
            const response = await userAPI.createUser(data)
            const responseData = await response.json()
            console.log(response)
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
        repeatPassword: ''
    })

    const handleInputValueChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
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
