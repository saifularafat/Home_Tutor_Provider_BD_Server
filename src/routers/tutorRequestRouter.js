const express = require("express");

const runValidation = require("../validators");
const {
    isLoggedIn,
    isAdmin,
} = require("../middlewares/auth");
const {
    handelGetTutorRequest,
    handelUpdateTutorRequest,
    handelDeleteTutorRequest,
    handelTutorRequestCreate,
} = require("../controllers/tutorRequestController");
const { validatorTutorRequestCreate } = require("../validators/tutorRequest");

const tutorRequestRouter = express.Router();

tutorRequestRouter.post('/',
    runValidation,
    validatorTutorRequestCreate,
    handelTutorRequestCreate)

tutorRequestRouter.get('/',
    handelGetTutorRequest)

tutorRequestRouter.put("/:id([0-9a-fA-F]{24})",
    handelUpdateTutorRequest)

tutorRequestRouter.delete("/:id([0-9a-fA-F]{24})",
    handelDeleteTutorRequest)


module.exports = tutorRequestRouter;