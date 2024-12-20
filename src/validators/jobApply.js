const { body } = require("express-validator");

// Create tutor request validator 
const validatorTutorJobApplyCreate = [
       body('currentLocation')
        .trim()
        .notEmpty()
        .withMessage("Tutor current location is required")
        .isLength({ min: 5 })
        .withMessage("Tutor current Location should be at least 5 characters long!"),
    body('tutorPhone')
        .trim()
        .notEmpty()
        .withMessage("Your contact Phone number is required, Enter your contact Phone number"),
    body('tutorWhatsappNumber')
        .trim()
        .notEmpty()
        .withMessage("Your contact Phone number is required, Enter your contact Phone number"),
]

module.exports = {
    validatorTutorJobApplyCreate,
}