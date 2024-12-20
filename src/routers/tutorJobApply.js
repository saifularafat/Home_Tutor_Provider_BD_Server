const express = require("express");

const runValidation = require("../validators");
const {
    isLoggedIn,
    isAdmin,
} = require("../middlewares/auth");
const { 
    handelGetTutorJobApply,
 } = require("../controllers/tutorJobApplyController");

const tutorJobApplyRouter = express.Router();

tutorJobApplyRouter.get('/',
    handelGetTutorJobApply)


module.exports = tutorJobApplyRouter;