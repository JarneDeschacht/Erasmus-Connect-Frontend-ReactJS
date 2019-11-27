export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
};

export const checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) {
        value = value.toString()
        isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    }
    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }
    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }
    if (rules.date) {
        const pattern = /^\d{3,4}(\/)\d{1,2}(\/)\d{1,2}$/i;
        const date = value.split('/');
        isValid =
            pattern.test(value) &&
            +date[2] > 0 &&
            +date[2] <= 31 &&
            +date[1] > 0 &&
            +date[1] <= 12 &&
            +date[0] > 1800 &&
            +date[0] <= new Date().getFullYear() &&
            isValid;
    }
    if (rules.compare) {
        const passwords = value.split(',');
        const isEqual = passwords[0] === passwords[1];
        isValid = isEqual && isValid;
    }

    return isValid;
}

export const checkPasswords = (password, passwordConfirmation) => {
    let isValid = false;

    if (password === passwordConfirmation) {
        isValid = true
    }
    return isValid;
}

export const giveCustomErrorMessage = (error) => {
    switch (error.message) {
        case 'INVALID_EMAIL': return 'You have to enter an email address';
        case 'EMAIL_NOT_FOUND': return 'Email address not found';
        case 'MISSING_PASSWORD': return 'You have to enter a password';
        case 'INVALID_PASSWORD': return 'Incorrect password';
        case 'EMAIL_EXISTS': return 'The email address already exists, try logging in '
        default: return error.message;
    }
}