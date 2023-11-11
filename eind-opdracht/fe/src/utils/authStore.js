import { AUTH_STORE_NAMESPACE } from 'constants/Config'
import * as storage from 'utils/storage'

export const setAuthStoreData = (token, user) => {
    storage.setItem(AUTH_STORE_NAMESPACE, { token, user })
}

export const getAuthStoreData = () => {
    const data = storage.getItem(AUTH_STORE_NAMESPACE)

    if (!data) {
        return false
    }

    return data
}

export const clearAuthStoreData = () => {
    storage.removeItem(AUTH_STORE_NAMESPACE)
}
