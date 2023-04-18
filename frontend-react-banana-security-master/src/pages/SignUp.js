import React, {useState} from 'react';
import axios from "axios";
import { Link, useHistory } from 'react-router-dom';
import {useAuth} from "../context/AuthContext";

function SignUp() {
    const history = useHistory();
    const [formValues, setFormValues] = useState( {
        email: '',
        password: '',
        username: '',
    });
    const [error, setError] = useState(null);
    const auth = useAuth();

    function handInputValueChange (e) {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });
    }

    async function handleFormSubmit (e) {
        e.preventDefault();
        console.log('registreer met: ', formValues);

        try {
            const response = await axios.post('http://localhost:3000/register', formValues);
            await auth.login(response.data.accessToken);
            history.push('/profile');
        } catch (e) {
            setError(e?.response?.data || 'Oeps , er ging iets fout')
        }
    }

    return (
        <>
            <h1>Registreren</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque eligendi
                harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur deserunt
                doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>
            <form onSubmit={handleFormSubmit}>
                <label>
                    Emailadres:
                    <input
                        type="text"
                        name="email"
                        value={formValues.email}
                        onChange={handInputValueChange}
                    />
                </label>
                <label>
                    Wachtwoord:
                    <input
                        type="password"
                        name="password"
                        value={formValues.password}
                        onChange={handInputValueChange}
                    />
                </label>
                <label>
                    Gebruikersnaam:
                    <input
                        type="text"
                        name="username"
                        value={formValues.username}
                        onChange={handInputValueChange}
                    />
                </label>
                {error && (
                    <div style={{ color: '#FF0000' }}>{error}</div>
                )}
                <button type="submit">Registeren</button>
            </form>
            <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
        </>
    );
}

export default SignUp;