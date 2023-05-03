import React, {useState} from 'react';
import './EmailadresInput.css';
function EmailadresInput() {

    const [formValues, setFormValues] = useState({
        email: '',
    });
    const handleInputValueChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    return (
        <>
            <input
                type="email"
                name="email"
                placeholder="e-mailadres"
                className="email__input__component"
                onChange={handleInputValueChange}
                value={formValues.email}
            />
        </>
    );
}

export default EmailadresInput;
