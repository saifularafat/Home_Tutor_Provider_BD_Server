const express = require("express");

const runValidation = require("../validators");
const {
    isLoggedIn,
    isAdmin,
} = require("../middlewares/auth");
const {
    handelGetTutorJobApply,
    handelGetSingleTutorJobApply,
    handelUpdateTutorJobApply,
} = require("../controllers/tutorJobApplyController");

const tutorJobApplyRouter = express.Router();

tutorJobApplyRouter.get('/',
    handelGetTutorJobApply)

tutorJobApplyRouter.get("/:id([0-9a-fA-F]{24})",
    handelGetSingleTutorJobApply)

tutorJobApplyRouter.put("/:id([0-9a-fA-F]{24})",
    handelUpdateTutorJobApply)


module.exports = tutorJobApplyRouter;