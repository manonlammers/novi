import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {useAuth} from "../context/AuthContext";

function Profile() {
    const auth = useAuth();
    const history = useHistory();

    useEffect(() => {
        if (!auth.user) {
            history.push('/signin')
        }
    },[auth.user]);

    if (!auth.user) {
        return null;
    }

    return (
        <>
            <h1>Profielpagina</h1>
            <section>
                <h2>Gegevens</h2>
                <p><strong>Gebruikersnaam:</strong> {auth.user.username} </p>
                <p><strong>Email:</strong> {auth.user.email} </p>
            </section>
            <section>
                <h2>Strikt geheime profiel-content</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>
            </section>
            <p>Terug naar de <Link to="/">Homepagina</Link></p>
        </>
    );
}

export default Profile;