import request from 'utils/request'

export const createUser = (data) => {
    return request('users/sign-up', {
        method: 'POST',
        data
    })
}

export const updateUser = (data) => {
    return request('users', {
        method: 'PUT',
        data
    })
}

export const updateAvatar = (id, formData) => {
    return request(`users/${id}/avatar`, {
        method: 'POST',
        formData
    })
}
