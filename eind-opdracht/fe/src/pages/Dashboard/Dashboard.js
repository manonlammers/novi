import React, {useState} from 'react';
import './Dashboard.css';
import NavBar from "../../components/NavBar/NavBar";
import TextInput from "../../components/Input/TextInput/TextInput";
import EmailadresInput from "../../components/Input/EmailadresInput/EmailadresInput";

function Dashboard() {

    const handleFormSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <div className="dashboard__wrapper">
                <NavBar/>
                <div className="dashboard">
                    <form
                        className="dashboard__form"
                        onSubmit={handleFormSubmit}
                    >
                        <div className="dashboard__column">
                            <div className="dashboard__column-one">
                                <TextInput
                                    name={"bedrijfsnaam"}
                                    typeName={"bedrijfsNaam"}
                                />
                                <TextInput
                                    name={"telefoonnummer"}
                                    typeName={"phoneNumber"}
                                />
                                <TextInput
                                    name={"postcode"}
                                    typeName={"postCode"}
                                />
                                <TextInput
                                    name={"kvk nummer"}
                                    typeName={"kvk"}
                                />
                            </div>
                            <div className="dashboard__column-two">
                                <EmailadresInput
                                />
                                <TextInput
                                    name={"adres"}
                                    typeName={"address"}
                                />
                                <TextInput
                                    name={"plaats"}
                                    value={"place"}
                                />
                                <TextInput
                                    name={"btw nummer"}
                                    value={"btw"}
                                />
                                <button type="submit">Aanmaken</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
