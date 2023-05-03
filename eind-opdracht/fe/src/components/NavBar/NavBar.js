import React, {useState} from 'react';
import './NavBar.css';
function NavBar() {
    const [showNavbar, setShowNavbar] = useState(false);

    const handleShowNavbar = () => {
        setShowNavbar(!showNavbar)
    }

    return (
        <div className="navbar">
            <a href="/overzicht">KBS</a>
            <a href="/profiel">Profiel</a>
            <a href="/dashboard">Bedrijf</a>
            <a href="/uitloggen">Uitloggen</a>
        </div>
    );
}

export default NavBar;
