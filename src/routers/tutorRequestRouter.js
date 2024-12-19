const express = require("express");

const runValidation = require("../validators");
const {
    isLoggedIn,
    isAdmin,
} = require("../middlewares/auth");
const {
    handelGetTutorRequest,
    handelDeleteTutorRequest,
} = require("../controllers/tutorRequestController");

const tutorRequestRouter = express.Router();

tutorRequestRouter.get('/', 
    handelGetTutorRequest)
tutorRequestRouter.delete("/:id([0-9a-fA-F]{24})",
     handelDeleteTutorRequest)


module.exports = tutorRequestRouter;