import React, { useState } from 'react'
import styles from './MyCompany.module.scss'
import NavBar from 'components/NavBar/NavBar'
import TextField from 'components/Textfield/TextField'
import Button from '../../components/Button/Button'

function MyCompany () {
    const [formValues, setFormValues] = useState({
        name: '',
        phoneNumber: '',
        email: '',
        zipcode: '',
        kvkNumber: '',
        address: '',
        city: '',
        taxNumber: ''
    })

    const handleInputValueChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }
    const handleFormSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <>
            <form
                onSubmit={handleFormSubmit}
            >

                <div className={styles.row}>
                    <TextField
                        label='Bedrijfsnaam'
                        name="name"
                        type="text"
                        className={styles.textField}
                        value={formValues.name}
                        onChange={handleInputValueChange}
                    />
                    <TextField
                        label='E-mailadres'
                        name="email"
                        type="text"
                        className={styles.textField}
                        value={formValues.email}
                        onChange={handleInputValueChange}
                    />
                </div>
                <div className={styles.row}>
                    <TextField
                        label='Telefoonnummer'
                        name="phone"
                        type="text"
                        className={styles.textField}
                        value={formValues.phoneNumber}
                        onChange={handleInputValueChange}
                    />
                    <TextField
                        label='Adres'
                        name="address"
                        type="text"
                        className={styles.textField}
                        value={formValues.address}
                        onChange={handleInputValueChange}
                    />
                </div>
                <div className={styles.row}>
                    <TextField
                        label='Postcode'
                        name="zipcode"
                        type="text"
                        className={styles.textField}
                        value={formValues.zipcode}
                        onChange={handleInputValueChange}
                    />
                    <TextField
                        label='Woonplaats'
                        name="city"
                        type="text"
                        className={styles.textField}
                        value={formValues.city}
                        onChange={handleInputValueChange}
                    />
                </div>

                <div className={styles.row}>
                    <TextField
                        label='Kvk nummer'
                        name="kvkNumber"
                        type="text"
                        className={styles.textField}
                        value={formValues.kvkNumber}
                        onChange={handleInputValueChange}
                    />
                    <TextField
                        label='BTW nummer'
                        name="taxNumber"
                        type="text"
                        className={styles.textField}
                        value={formValues.taxNumber}
                        onChange={handleInputValueChange}
                    />
                </div>
                <div className={styles.submitWrapper}>
                    <Button className={styles.submit}>Aanmaken</Button>
                </div>

                {/* <div className={styles.row}> */}
                {/*    <Button className={styles.submit}>Aanmaken</Button> */}
                {/* </div> */}

                {/* <div className={styles.column}> */}
                {/*    <TextField */}
                {/*        label='Bedrijfsnaam' */}
                {/*        name="name" */}
                {/*        type="text" */}
                {/*        value={formValues.name} */}
                {/*        onChange={handleInputValueChange} */}
                {/*    /> */}
                {/*    <TextField */}
                {/*        label='Telefoonnummer' */}
                {/*        name="phone" */}
                {/*        type="text" */}
                {/*        value={formValues.phoneNumber} */}
                {/*        onChange={handleInputValueChange} */}
                {/*    /> */}
                {/*    <TextField */}
                {/*        label='Postcode' */}
                {/*        name="zipcode" */}
                {/*        type="text" */}
                {/*        value={formValues.zipcode} */}
                {/*        onChange={handleInputValueChange} */}
                {/*    /> */}
                {/*    <TextField */}
                {/*        label='Kvk nummer' */}
                {/*        name="kvkNumber" */}
                {/*        type="text" */}
                {/*        value={formValues.kvkNumber} */}
                {/*        onChange={handleInputValueChange} */}
                {/*    /> */}
                {/* </div> */}
                {/* <div className={styles.column}> */}
                {/*    <TextField */}
                {/*        label='E-mailadres' */}
                {/*        name="email" */}
                {/*        type="text" */}
                {/*        value={formValues.email} */}
                {/*        onChange={handleInputValueChange} */}
                {/*    /> */}
                {/*    <TextField */}
                {/*        label='Adres' */}
                {/*        name="address" */}
                {/*        type="text" */}
                {/*        value={formValues.address} */}
                {/*        onChange={handleInputValueChange} */}
                {/*    /> */}
                {/*    <TextField */}
                {/*        label='Woonplaats' */}
                {/*        name="city" */}
                {/*        type="text" */}
                {/*        value={formValues.city} */}
                {/*        onChange={handleInputValueChange} */}
                {/*    /> */}
                {/*    <TextField */}
                {/*        label='BTW nummer' */}
                {/*        name="taxNumber" */}
                {/*        type="text" */}
                {/*        value={formValues.taxNumber} */}
                {/*        onChange={handleInputValueChange} */}
                {/*    /> */}
                {/*    <Button>Aanmaken</Button> */}
                {/* </div> */}
            </form>
        </>
    )
}

export default MyCompany
