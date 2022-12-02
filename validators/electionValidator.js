const { body } = require('express-validator');
const checkValidation = require('./checkValidator');

const electionValidators = [
    body('surname').notEmpty().trim().escape().withMessage("Surname is required"),
    body('first_name').notEmpty().trim().escape().withMessage("First name is required"),
    body('other_name').trim().escape(),
    body('dob').isBefore().withMessage("Birth date must be a date in the past"),
    body('admission_date').isBefore().withMessage("Registration date must be a date in the past"),
    body('gender').isIn(["Male", "Female"]),
    body('email').isEmail().normalizeEmail(),
    body('phone').isMobilePhone(),
    body('sponsor_email').isEmail().normalizeEmail(),
    body('sponsor_phone').isMobilePhone(),
    body('address').notEmpty().trim().escape(),
    checkValidation
]

module.exports = electionValidators

