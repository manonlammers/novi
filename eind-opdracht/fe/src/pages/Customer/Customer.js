import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import * as validationUtils from 'utils/validation'
import * as customerAPI from 'api/customer'
import * as Routes from 'constants/Routes'
import { useUser } from 'components/UserProvider/UserProvider'

import TextField from 'components/Textfield/TextField'
import Typography from 'components/Typography/Typography'
import Button from 'components/Button/Button'
import styles from './Customer.module.scss'

function Customer () {
    const navigate = useNavigate()
    const params = useParams()
    const { user } = useUser()

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [formErrors, setFormErrors] = useState({})
    const [formValues, setFormValues] = useState({
        name: '',
        treatment: '',
        minutes: '',
        pain: '',
        info: '',
        companyId: user?.company?.id
    })

    useEffect(() => {
        if (params.id) {
            customerAPI.getCustomerById(params.id)
                .then(response => response.json())
                .then(data => setFormValues(data))
        }
    }, [params])

    const saveCustomer = async (data) => {
        setLoading(true)
        setError(null)

        try {
            const response = await customerAPI.updateOrCreateCustomer(data)
            if (response.status >= 400) {
                return setError('Oeps, er ging iets fout')
            }

            navigate(Routes.CUSTOMERS)
        } catch (e) {
            console.log(e)
            setError('Oeps, er ging iets fout')
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

        if (!validationUtils.validateIsRequired(formValues.name)) {
            errors.name = 'Is vereist'
        }

        if (!validationUtils.validateIsRequired(formValues.treatment)) {
            errors.treatment = 'Is vereist'
        }

        if (!validationUtils.validateIsRequired(formValues.minutes)) {
            errors.minutes = 'Is vereist'
        }

        if (!validationUtils.validateIsRequired(formValues.pain)) {
            errors.pain = 'Is vereist'
        }

        if (!validationUtils.validateIsRequired(formValues.info)) {
            errors.info = 'Is vereist'
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
            return saveCustomer(formValues)
        }
    }

    return (
        <>
            <form
                className={styles.form}
                onSubmit={handleFormSubmit}
            >
                <div className={styles.row}>
                    <TextField
                        label='Naam'
                        name="name"
                        type="text"
                        className={styles.textField}
                        value={formValues.name}
                        error={formErrors.name}
                        onChange={handleInputValueChange}
                    />
                    <TextField
                        label='Behandeling'
                        name="treatment"
                        type="text"
                        className={styles.textField}
                        value={formValues.treatment}
                        error={formErrors.treatment}
                        onChange={handleInputValueChange}
                    />
                </div>
                <div className={styles.row}>
                    <TextField
                        label='Duur'
                        name="minutes"
                        type="number"
                        className={styles.textField}
                        value={formValues.minutes}
                        error={formErrors.minutes}
                        onChange={handleInputValueChange}
                    />
                    <TextField
                        label='Klachten'
                        name="pain"
                        type="text"
                        className={styles.textField}
                        value={formValues.pain}
                        error={formErrors.pain}
                        onChange={handleInputValueChange}
                    />
                </div>
                <div className={styles.row}>
                    <TextField
                        label='Informatie'
                        name="info"
                        type="text"
                        className={styles.textField}
                        value={formValues.info}
                        error={formErrors.info}
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

export default Customer
