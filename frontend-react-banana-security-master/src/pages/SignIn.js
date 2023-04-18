import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

function SignIn() {
    const [formValues, setFormValues] = useState({
        email: null,
        password: null,
    })
    const [error, setError] = useState(null);
    const history = useHistory();
    const auth = useAuth();

    function handleInputValueChange (event) {
        console.log(event.target.name, 'is ', event.target.value);
        setFormValues({
            ...formValues,
            [event.target.name]: event.target.value
        })
    }

    async function handleFormSubmit (event) {
        event.preventDefault();
        setError(null);

        try {
            const response = await axios.post('http://localhost:3000/login', formValues);
            await auth.login(response.data.accessToken);
            history.push('/profile')
        } catch (e) {
            setError(e?.response?.data || 'Oeps, iets ging er fout.')
        }
    }

    // post request om de ingevulde gegevens

    return (
        <>
            <h1>Inloggen</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>

            <form onSubmit={handleFormSubmit}>
                <label>
                    Emailadres:
                    <input
                        type="text"
                        name="email"
                        value={formValues.email}
                        onChange={handleInputValueChange}
                    />
                </label>
                <label>
                    Wachtwoord:
                    <input
                        type="password"
                        name="password"
                        value={formValues.password}
                        onChange={handleInputValueChange}
                    />
                </label>
                {error && (
                    <div style={{ color: '#FF0000' }}>{error}</div>
                )}
                <button type="submit">Inloggen</button>
            </form>

            <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
        </>
    );
}

export default SignIn;