const { body } = require("express-validator");

// Create tutor request validator 
const validatorContactCreate = [
       body('contactName')
        .trim()
        .notEmpty()
        .withMessage("User Name is required"),
       body('contactEmail')
        .trim()
        .notEmpty()
        .withMessage("User Email is required"),
    body('message')
        .trim()
        .notEmpty()
        .isLength({ min: 8 })
        .withMessage("Please You Problem is should be at least 8 characters long!"),
]

module.exports = {
    validatorContactCreate,
}