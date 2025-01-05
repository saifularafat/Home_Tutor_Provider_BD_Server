const { body } = require("express-validator");
const { model } = require("mongoose");

// blog validator 
const validatorBlog = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage("Blog Title is required")
        .isLength({ min: 7 })
        .withMessage("Blog title should be at least 8 characters long!"),
    body('image')
        .trim()
        .notEmpty()
        .withMessage("Blog image is required"),
    body('medium')
        .trim()
        .notEmpty()
        .withMessage("Medium is required"),
    body('category')
        .trim()
        .notEmpty()
        .withMessage("Category is required"),
    body('subject')
        .trim()
        .notEmpty()
        .withMessage("Subject is required"),
    body('studentHelp')
        .trim()
        .notEmpty()
        .withMessage("Subject help by user is required"),
    body('description')
        .trim()
        .notEmpty()
        .withMessage("Blog description is required"),
    body('authorName')
        .trim()
        .notEmpty()
        .withMessage("Author name is required"),
    body('authorEducationLevel')
        .trim()
        .notEmpty()
        .withMessage("Author education level is required"),
    body('authorStudySubject')
        .trim()
        .notEmpty()
        .withMessage("Author study subject is required"),
    body('authorProfession')
        .trim()
        .notEmpty()
        .withMessage("Author profession is required"),
    body('userId')
        .trim()
        .notEmpty()
        .withMessage("Author user id is required"),
]

module.exports = { validatorBlog }