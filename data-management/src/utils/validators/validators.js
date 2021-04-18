export const maxLength = max => value => {
    if (value && value.length > max) {
        return `Максимум ${max} символов, включая пробел`
    }

    return undefined
}

export const required = value => {
    if (value || typeof value === 'number') {
        return undefined
    }

    return 'Required'
}

export const passport = value => {
    const regExp = /^[0-9]{4} [0-9]{6}$/
    value = value.trim();
    if (regExp.test(value)) {
        return undefined
    }
    // if (value.includes(' ')) {
    //     let values = value.split(' ')
    //     if (values[0].length !== 4) {
    //         return 'Серия 4 символа'
    //     } else {
    //         if
    //     }
    //     return undefined
    // }

    return 'Введите данные согласно шаблону: 0000 000000'
}

