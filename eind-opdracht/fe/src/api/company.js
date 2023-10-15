import request from 'utils/request'

export const updateOrCreateCompany = (data) => {
    return request('companies', {
        method: 'POST',
        body: data
    })
}
