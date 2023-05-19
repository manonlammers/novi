const API_URL = 'http://localhost:8080'

export const getCompanyById = () => {}

export const createCompany = (data) => {
    return fetch(`${API_URL}/companies`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const updateCompany = () => {}
