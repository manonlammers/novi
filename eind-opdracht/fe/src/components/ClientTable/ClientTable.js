import React from 'react'
import './ClientTable.css'
function ClientTable () {
    const data = [
        { name: 'Piet', treatment: 19, minutes: '60', pain: 'rug', info: 'blabla' },
        { name: 'Piet', treatment: 19, minutes: '60', pain: 'rug', info: 'blabla' },
        { name: 'Piet', treatment: 19, minutes: '60', pain: 'rug', info: 'blabla' }

    ]

    return (
        <div className="table">
            <table>
                <tr className="important-row">
                    <th>Naam</th>
                    <th>Soort behandeling</th>
                    <th>Duur behandeling</th>
                    <th>Klachten</th>
                    <th>Informatie</th>
                </tr>
                {data.map((val, key) => {
                    return (

                        <tr key={key}>
                            <input
                                type="checkbox"
                            />
                            <td>{val.name}</td>
                            <td>{val.treatment}</td>
                            <td>{val.minutes}</td>
                            <td>{val.pain}</td>
                            <td>{val.info}</td>
                        </tr>
                    )
                })}
            </table>
        </div>
    )
}

export default ClientTable
