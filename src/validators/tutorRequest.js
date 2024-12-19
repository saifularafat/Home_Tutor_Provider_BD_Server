const { body } = require("express-validator");

// Create tutor request validator 
const validatorTutorRequestCreate = [
    body('category')
        .trim()
        .notEmpty()
        .withMessage("Guardian category is required"),
    body('location')
        .trim()
        .notEmpty()
        .withMessage("Guardian Location is required")
        .isLength({ min: 4 })
        .withMessage("Tutor request Location should be at least 4 characters long!"),
    body('subLocation')
        .trim()
        .notEmpty()
        .withMessage("Guardian sub location is required")
        .isLength({ min: 4 })
        .withMessage("Tutor request sub Location should be at least 4 characters long!"),
    body('guardianPhone')
        .trim()
        .notEmpty()
        .withMessage("Your contact Phone number is required, Enter your contact Phone number"),
    body('guardianAddress')
        .trim()
        .notEmpty()
        .withMessage(" Guardian full address is required")
        .isLength({ min: 8 })
        .withMessage("Tutor request full address should be at least 8 characters long!"),
    body('comments')
        .trim()
        .notEmpty()
        .withMessage("Comment is required"),
   
]

module.exports = {
    validatorTutorRequestCreate,
}