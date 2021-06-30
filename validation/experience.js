const Validator = require('validator');
const isEmpty = require('./is-empty')

module.exports = function validateExperienceInput(data) {
    let errors = {}

    data.tittle = !isEmpty(data.tittle) ? data.tittle : '';
    data.company = !isEmpty(data.company) ? data.company : '';
    data.from = !isEmpty(data.from) ? data.from : '';

    if (Validator.isEmpty(data.tittle)) {
        errors.tittle = 'Поле обязательно для заполнения'
    }

    if (Validator.isEmpty(data.company)) {
        errors.company = 'Поле обязательно для заполнения'
    }

    if (Validator.isEmpty(data.from)) {
        errors.from = 'Поле обязательно для заполнения'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}