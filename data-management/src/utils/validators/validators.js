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
    return 'Обязательно для заполнения'
}

export const passport = value => {
    const regExp = /^[0-9]{4} [0-9]{6}$/
    value = value.trim();
    if (regExp.test(value)) {
        return undefined
    }

    return 'Введите данные согласно шаблону: сссс нннннн'
}

export const telephoneNumber = value => {
    const regExp = /^\+7{1}\([0-9]{3}\)[0-9]{7}$/
    value = value.trim();
    if (regExp.test(value)) {
        return undefined
    }

    return 'Введите данные согласно шаблону: +7(777)7777777'
}

export const minValue = min => value => {
    const regExp = /^\d+$/
    if (regExp.test(value)) {
        if (Number(value) >= min) {
            return undefined
        } else {
            return `Требуется число больше либо равное ${min}`
        }
    }

    return `Требуется число больше либо равное ${min}`
}
