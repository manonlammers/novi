const API_URL = 'http://localhost:8080'

export const getAllCustomers = () => {
    return fetch(`${API_URL}/customers/all-customers`, {
        method: 'GET'
    })
}
export const createCustomer = (data) => {
    return fetch(`${API_URL}/customers`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const deleteCustomer = (id) => {
    return fetch(`${API_URL}/customers/${id}`, {
        method: 'DELETE'
    })
}
