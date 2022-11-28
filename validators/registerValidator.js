const { body } = require('express-validator');
const checkValidation = require('./checkValidator');

const registerValidators = [
    body('first_name').notEmpty().trim().escape().withMessage("Name is required"),
    body('surname').notEmpty().trim().escape().withMessage("Party acronym is required"),
    body('lga').notEmpty().trim().escape().withMessage("Slogan is required"),
   
    checkValidation
]

module.exports = registerValidators