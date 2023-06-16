const API_URL = 'http://localhost:8080'

export const createCustomer = (data) => {
    return fetch(`${API_URL}/customers`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const getCustomerById = (id) => {
    return fetch(`${API_URL}/customers/${id}`, {
        method: 'GET'
    })
}
export const getAllCustomers = () => {
    return fetch(`${API_URL}/customers/all-customers`, {
        method: 'GET'
    })
}

export const updateCustomer = (id, data) => {
    return fetch(`${API_URL}/customers/${id}`, {
        method: 'PUT',
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
