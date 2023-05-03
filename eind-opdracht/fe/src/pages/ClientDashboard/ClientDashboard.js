import React from 'react';
import NavBar from "../../components/NavBar/NavBar";
import './ClientDasboard.css';
import TextInput from "../../components/Input/TextInput/TextInput";
import ClientTable from "../../components/ClientTable/ClientTable";

function ClientDashboard() {



    return (
        <>
        <div className="clientdashboard__wrapper">
            <NavBar/>
            <div className="clientdashboard">
                <div
                    className="clientdashboard__container"
                >
                   <TextInput
                       name={"Zoeken.."}
                   />
                    <ClientTable/>
                </div>
            </div>
        </div>
        </>
    );
}

export default ClientDashboard;
