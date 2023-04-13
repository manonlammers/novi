import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {useAuth} from "../context/AuthContext";

function SignIn() {
    const { login } = useAuth();

    //post request om de ingevulde gegevens

//     return (
//         <>
//             <h1>Inloggen</h1>
//             <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>
//
//             <form>
//                 <label>
//                     Emailadres: <input type="text" name="emailadress" />
//                     Wachtwoord: <input type="text" name="wachtwoord"/>
//                 </label>
//                 <button onClick={login} type="button">Inloggen</button>
//             </form>
//
//             <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
//         </>
//     );

    async function logUserIn() {
        try {
            const  response = await axios.post('http://localhost:3000/login');
            console.log(response);

            // roep de login-functie van de context aan, zodat alle verdere acties
            // daar geregeld kunnen worden. Let op: we loggen de gebruiker dus niet opnieuw in!
            login(response.data.accessToken);
        } catch (e) {
            console.error(e);
        }
    }
}

export default SignIn;