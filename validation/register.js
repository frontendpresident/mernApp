const Validator = require('validator');
const isEmpty = require('./is-empty')

module.exports = function validateRegistrInput(data) {
    let errors = {}

    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

    if (!Validator.isLength(data.name, { min: 5, max: 15 })) {
        errors.name = 'Имя должно быть длиннее 5 символов и короче 15'
    }

    if(!Validator.isLength(data.password, {min: 5, max: 50})){
        errors.password = 'Пароль должен быть минимум 5 символов'
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Поле обязательно для заполнения'
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Поле обязательно для заполнения'
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Некорректный Email'
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Поле обязательно для заполнения'
    }

    if (Validator.isEmpty(data.password2)) {
        errors.password2 = 'Поле обязательно для заполнения'
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = 'Пароли не совпадают'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}