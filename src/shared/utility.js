export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
};

export const checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) {
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

    return isValid;
}

export const giveCustomErrorMessage = (error) => {
    switch (error.message) {
        case 'INVALID_EMAIL': return 'You have to enter an email address';
        case 'EMAIL_NOT_FOUND': return 'Email address not found';
        case 'MISSING_PASSWORD': return 'You have to enter a password';
        case 'INVALID_PASSWORD': return 'Incorrect password';
        default: return error.message;
    }
}