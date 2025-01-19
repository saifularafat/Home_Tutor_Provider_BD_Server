const { body } = require("express-validator");

// Create tutor request validator 
const validatorHireTutorRequestCreate = [
    body('jobCategory')
        .trim()
        .notEmpty()
        .withMessage("Guardian Job Category is required"),
    body('jobSubject')
        .trim()
        .notEmpty()
        .withMessage("Tuition subject is required"),
    body('studentClass')
        .trim()
        .notEmpty()
        .withMessage("Student class is required"),
    body('howManyStudent')
        .trim()
        .notEmpty()
        .withMessage("How Many Student class is required"),
    body('studentGender')
        .trim()
        .notEmpty()
        .withMessage("Student gender is required"),
    body('tuitionSalary')
        .trim()
        .notEmpty()
        .withMessage("Tuition salary is required"),
    body('tuitionStartMonth')
        .trim()
        .notEmpty()
        .withMessage("Tuition Start Month is required"),
    body('studentLocation')
        .trim()
        .notEmpty()
        .withMessage("Student Location is required")
        .isLength({ min: 4 })
        .withMessage("Student request Location should be at least 4 characters long!"),
    body('studentSubLocation')
        .trim()
        .notEmpty()
        .withMessage("Student sub location is required")
        .isLength({ min: 4 })
        .withMessage("Student request sub Location should be at least 4 characters long!"),
    body('tuitionFullAddress')
        .trim()
        .notEmpty()
        .withMessage("tuition full address is required")
        .isLength({ min: 4 })
        .withMessage("tuition full address should be at least 4 characters long!"),
    body('parentPhone')
        .trim()
        .notEmpty()
        .withMessage("Your contact Phone number is required, Enter your contact Phone number"),
    body('comments')
        .trim()
        .notEmpty()
        .withMessage("Comment is required"),

]

module.exports = {
    validatorHireTutorRequestCreate,
}