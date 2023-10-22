import { API_URL } from 'constants/Config'

const defaultHeaders = {
    accept: 'application/json'
}

export const setTokenHeader = (value) => {
    /* eslint-disable-next-line */
    defaultHeaders['token'] = value
}

export const clearTokenHeader = () => {
    /* eslint-disable-next-line */
    delete defaultHeaders['token']
}

export default function request (path, args = {}) {
    const url = `${API_URL}/${path}`
    const options = {
        headers: defaultHeaders,
        method: args.method || 'GET'
    }

    if (args.body) {
        options.body = JSON.stringify(args.body)
        options.headers['content-type'] = 'application/json'
    }

    return fetch(url, options)
}
