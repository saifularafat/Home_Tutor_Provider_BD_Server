const express = require("express");

const runValidation = require("../validators");
const {
    isLoggedIn,
    isAdmin,
} = require("../middlewares/auth");
const {
    handelGetTutorRequest,
} = require("../controllers/tutorRequestController");

const tutorRequestRouter = express.Router();

tutorRequestRouter.get('/', handelGetTutorRequest)


module.exports = tutorRequestRouter;