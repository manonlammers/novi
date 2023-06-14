const API_URL = 'http://localhost:8080'

export const login = (data) => {
    return fetch(`${API_URL}/users/login`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const createUser = (data) => {
    return fetch(`${API_URL}/users/sign-up`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const updateUser = () => {}
