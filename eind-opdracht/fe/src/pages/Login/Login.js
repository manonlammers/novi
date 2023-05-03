import React, {useState} from 'react';
import './Login.css';
import logo from 'assets/connection-icon-png-11.jpeg';
import EmailadresInput from "../../components/Input/EmailadresInput/EmailadresInput";
import PasswordInput from "../../components/Input/PasswordInput/PasswordInput";
import Logo from "../../components/Logo/Logo";

function Login() {

    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
    });

    const handleInputValueChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <div className="login__wrapper">
                <div className="logo">
                    <img src={logo} alt="logo"/>
                    <h1>KBS</h1>
                </div>
                <div className="login">
                    <form
                        className="login__form"
                        onSubmit={handleFormSubmit}
                        noValidate
                    >
                        <div className="login__form__label">Inloggen</div>
                        <div className="form__input">
                            <label className="form__input__label">E-mailadres</label>

                            <EmailadresInput
                                value={formValues.email}
                            />
                            <PasswordInput
                                value={formValues.password}
                                onChange={handleInputValueChange}
                            />
                        </div>
                        <button type="submit">inloggen</button>
                    </form>

                </div>
            </div>
        </>
    );
}

export default Login;
