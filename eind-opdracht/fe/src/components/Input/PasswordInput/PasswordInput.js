import React from 'react';
import './PasswordInput.css';

function PasswordInput() {
    return (
        <input
            type="password"
            name="password"
            placeholder="wachtwoord"
            className="password__input__component"
        />
    );
}

export default PasswordInput;
