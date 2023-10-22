import request from 'utils/request'
export const getAllUsers = () => {
    return request('admin/all-users', {
        method: 'GET'
    })
}

export const deleteUser = (id) => {
    return request(`admin/delete-user/${id}`, {
        method: 'DELETE'
    })
}
