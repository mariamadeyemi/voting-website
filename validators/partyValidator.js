const { body } = require('express-validator');
const checkValidation = require('./checkValidator');

const partyValidators = [
    body('name').notEmpty().trim().escape().withMessage("Name is required"),
    body('acronym').notEmpty().trim().escape().withMessage("Party acronym is required"),
    body('slogan').notEmpty().trim().escape().withMessage("Slogan is required"),
   
    checkValidation
]

module.exports = partyValidators