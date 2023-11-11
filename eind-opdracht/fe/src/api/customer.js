import request from 'utils/request'

export const createCustomer = (data) => {
    return request('customers', {
        method: 'POST',
        data
    })
}

export const getCustomerById = (id) => {
    return request(`customers/${id}`, {
        method: 'GET'
    })
}
export const getAllCustomersByCompanyId = (companyId) => {
    return request(`customers/all-customers/${companyId}`, {
        method: 'GET'
    })
}

export const updateOrCreateCustomer = (data) => {
    return request('customers', {
        method: 'POST',
        data
    })
}

export const deleteCustomer = (id) => {
    return request(`customers/${id}`, {
        method: 'DELETE'
    })
}
