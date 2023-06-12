export const validateIsRequired = (value) => {
    return Boolean(value)
}

export const validateEmail = (value) => {
    return value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
}

export const validatePhone = (value) => {
    return value.match(/(^\+[0-9]{2}|^\+[0-9]{2}\(0\)|^\(\+[0-9]{2}\)\(0\)|^00[0-9]{2}|^0)([0-9]{9}$|[0-9\-\s]{10}$)/)
}

export const validateZipcode = (value) => {
    return value.match(/^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i)
}
