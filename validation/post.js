const Validator = require('validator');
const isEmpty = require('./is-empty')

module.exports = function validatePostInput(data) {
    let errors = {}

    data.text = !isEmpty(data.text) ? data.text : '';

    if(!Validator.isLength(data.text, {min: 5, max: 300})){
        errors.textLength = 'Длина поста не менее 5 и не больше 300 символов'
    }

    if (Validator.isEmpty(data.text)) {
        errors.text = 'Введите текст'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}