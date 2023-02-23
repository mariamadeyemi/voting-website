const { body } = require('express-validator');
const Voter = require('../models/Voter');
const checkValidation = require('./checkValidator');

const registerValidators = [
    body('first_name').notEmpty().trim().escape().withMessage("Name is required"),
    body('surname').notEmpty().trim().escape().withMessage("Surname is required"),
    body('lga').notEmpty().trim().escape().withMessage("Lga is required"),
    body('address').notEmpty().trim().escape().withMessage("    Address is required"),
body('phone_number').notEmpty().trim().escape().withMessage("Phone number is required"),
body('gender').isIn(["Male", "Female"]),
body('date_of_birth').isBefore().withMessage("Birth date must be a date in the past"),
body('email_address').notEmpty().trim().normalizeEmail().isEmail().withMessage("Invalid email").custom(async (email) => {
    const existingUser = await Voter.fetch(email)
         
    if (existingUser) {
        // req.flash("Error", "Email already in use")
        throw new Error('Email already in use')
    }
}),
body('phone_number').isMobilePhone().custom(async (value) => {
    const existingUser = await Voter.fetch(value)
         
    if (existingUser) {
        // req.flash("Error", "Email already in use")
        throw new Error('Phone number already in use')
    }
}),

 checkValidation
]

module.exports = registerValidators