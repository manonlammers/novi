import React, { useState } from 'react'
import styles from './Login.module.scss'
import AuthLayout from 'components/AuthLayout/AuthLayout'
import TextField from 'components/Textfield/TextField'
import Button from 'components/Button/Button'
import Typography from 'components/Typography/Typography'

function Login () {
    const [formValues, setFormValues] = useState({
        email: '',
        password: ''
    })

    const handleInputValueChange = (e) => {
        const { name, value } = e.target
        setFormValues({ ...formValues, [name]: value })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <AuthLayout>
            <form
                className={styles.form}
                // autoComplete="off"
                noValidate
            >
                <Typography variant="h5">Inloggen</Typography>
                <TextField
                    label="E-mailadres"
                    value={formValues.email}
                    name="email"
                    type="email"
                    helpText={'Vul hier je e-mailadres in.'}
                    onChange={handleInputValueChange}
                />
                <TextField
                    label="Wachtwoord"
                    value={formValues.password}
                    name="password"
                    type="password"
                    error={true}
                    helpText={'Vul hier je wachtwoord in.'}
                    onChange={handleInputValueChange}
                />
                <Button>Inloggen</Button>
            </form>
        </AuthLayout>
    )
}

export default Login
