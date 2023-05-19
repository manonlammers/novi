const API_URL = 'http://localhost:8080'

export const getUserById = () => {}

export const createUser = (data) => {
    return fetch(`${API_URL}/users`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const updateUser = () => {}
