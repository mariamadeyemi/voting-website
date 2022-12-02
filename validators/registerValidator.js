const { body } = require('express-validator');
const checkValidation = require('./checkValidator');

const registerValidators = [
    body('first_name').notEmpty().trim().escape().withMessage("Name is required"),
    body('surname').notEmpty().trim().escape().withMessage("Surname is required"),
    body('lga').notEmpty().trim().escape().withMessage("Lga is required"),
   
    checkValidation
]

module.exports = registerValidators