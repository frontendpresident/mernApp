const Validator = require('validator');
const isEmpty = require('./is-empty')

module.exports = function validateRegistrInput(data){
    let errors = {}

    if(!Validator.isLength(data.name, {min: 5, max: 15})){
        errors.name = 'Имя должно быть длиннее 5 символов и короче 15'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}