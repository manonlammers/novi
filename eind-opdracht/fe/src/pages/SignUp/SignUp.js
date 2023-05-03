import React, {useState} from 'react';
import './SignUp.css';
import Logo from "../../components/Logo/Logo";
import logo from "../../assets/connection-icon-png-11.jpeg";
import TextInput from "../../components/Input/TextInput/TextInput";
import EmailadresInput from "../../components/Input/EmailadresInput/EmailadresInput";
import PasswordInput from "../../components/Input/PasswordInput/PasswordInput";

function SignUp() {

    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
        secondPassword: '',
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
        <div className="register">
            <form
                className="register__form"
                onSubmit={handleFormSubmit}
                noValidate
            >
                <div className="register__form__label">Registreren</div>
                <EmailadresInput/>
                {/*<input*/}
                {/*    type="password"*/}
                {/*    name="password"*/}
                {/*    placeholder="wachtwoord"*/}
                {/*    value={formValues.password}*/}
                {/*    onChange={handleInputValueChange}*/}
                {/*/>*/}
                <PasswordInput/>
                <input
                    type="password"
                    name="password"
                    placeholder="herhaal wachtwoord"
                    value={formValues.secondPassword}
                    onChange={handleInputValueChange}
                />
                <button type="submit">registreren</button>
            </form>
        </div>
        </div>
      </>
    );
}

export default SignUp;
