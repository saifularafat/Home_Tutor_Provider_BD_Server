const { body } = require("express-validator");

// Create tuition Job validator 
const validatorTuitionJobCreate = [
    body('jobLocation')
        .trim()
        .notEmpty()
        .withMessage("Tuition Location is required")
        .isLength({ min: 12 })
        .withMessage("Tuition Location should be at least 12 characters long!"),
    body('jobSalary')
        .trim()
        .notEmpty()
        .withMessage("Job Salary is required."),
    body('contactNumber')
        .trim()
        .notEmpty()
        .withMessage("Your contact Phone number is required, Enter your contact Phone number"),
    body('tutorGender')
        .trim()
        .notEmpty()
        .withMessage("Tutor gender is required"),
    body('medium')
        .trim()
        .notEmpty()
        .withMessage("Medium is required"),
    body('jobCategory')
        .trim()
        .notEmpty()
        .withMessage("Job category is required"),
    body('perWeek')
        .trim()
        .notEmpty()
        .withMessage("Per week is required"),
    body('className')
        .trim()
        .notEmpty()
        .withMessage("Class name is required"),
    body('subject')
        .trim()
        .notEmpty()
        .withMessage("Subject is required"),
    body('duration')
        .trim()
        .notEmpty()
        .withMessage("Duration is required"),
    body('studentGender')
        .trim()
        .notEmpty()
        .withMessage("Student gender is required"),
    body('fixedTime')
        .trim()
        .notEmpty()
        .withMessage("Fixed time is required"),
]

// update tuition Job validator 
const validatorTuitionJobUpdate = [
  
    body('jobSalary')
        .trim()
        .notEmpty()
        .withMessage("Job Salary is required."),
    body('contactNumber')
        .trim()
        .notEmpty()
        .withMessage("Your contact Phone number is required, Enter your contact Phone number"),
    body('whatsAppNumber')
        .trim()
        .notEmpty()
        .withMessage("Your whatsApp Phone number is required, Enter your whatsApp Phone number"),
   
]
module.exports = {
    validatorTuitionJobCreate,
    validatorTuitionJobUpdate
}