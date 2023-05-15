import React, { useState } from 'react'
import styles from './SignUp.module.scss'
import TextField from 'components/Textfield/TextField'
import AuthLayout from 'components/AuthLayout/AuthLayout'
import Typography from 'components/Typography/Typography'
import Button from 'components/Button/Button'

function SignUp () {
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
        repeatPassword: ''
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
                autoComplete="off"
            >
                <Typography variant="h5">Registreren</Typography>
                <TextField
                    label="E-mailadres"
                    value={formValues.email}
                    name="email"
                    type="email"
                    helpText={'Vul hier uw e-mailadres in.'}
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
                <TextField
                    label="Herhaal wachtwoord"
                    value={formValues.repeatPassword}
                    name="password"
                    type="password"
                    error={true}
                    helpText={'Vul hier je wachtwoord in.'}
                    onChange={handleInputValueChange}
                />
                <Button>Registreren</Button>
            </form>
        </AuthLayout>
    )
}

export default SignUp
