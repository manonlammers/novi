import React, {useState} from 'react';
import './TextInput.css';
function TextInput({ name, typeName }) {

    const [formValues, setFormValues] = useState({
        bedrijfsNaam: '',
        phoneNumber: '',
        postCode: '',
        kvk: '',
        address: '',
        place: '',
        btw: '',
        email: '',
        password: '',
    });

    const handleInputValueChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    return (
        <>
            <input
                type="text"
                name="text"
                placeholder={name}
                className="text__input__component"
                value={formValues.typeName}
                onChange={handleInputValueChange}
            />
        </>
    );
}

export default TextInput;
