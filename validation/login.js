const Validator = require('validator');
const isEmpty = require('./is-empty')

module.exports = function validateLoginInput(data) {
    let errors = {}

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Поле обязательно для заполнения'
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Некорректный Email'
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Поле обязательно для заполнения'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}