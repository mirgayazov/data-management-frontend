export const maxLength = max => value => {
    if (value && value.length > max) {
        return `Must be ${max} characters or less`
    }

    return undefined
}

export const required = value => {
    if (value || typeof value === 'number') {
        return undefined
    }

    return 'Required'
}
