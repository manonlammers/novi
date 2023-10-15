import request from 'utils/request'

export const createUser = (data) => {
    return request('users/sign-up', {
        method: 'POST',
        body: data
    })
}

export const getAllUsers = () => {
    return request('users/all-users', {
        method: 'GET'
    })
}

export const deleteUser = (id) => {
    return request(`users/${id}`, {
        method: 'DELETE'
    })
}
