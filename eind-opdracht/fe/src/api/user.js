import request from 'utils/request'

export const createUser = (data) => {
    return request('users/sign-up', {
        method: 'POST',
        body: data
    })
}
