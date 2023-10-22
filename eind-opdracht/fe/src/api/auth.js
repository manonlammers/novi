import request from 'utils/request'

export const login = (data) => {
    return request('auth/login', {
        method: 'POST',
        body: data
    })
}
