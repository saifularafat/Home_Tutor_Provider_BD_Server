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
    handelDeleteTutorJobApply,
    handelTutorJobApplyCreate,
    handelManageJobApplyApproveAndPendingById,
} = require("../controllers/tutorJobApplyController");
const { validatorTutorJobApplyCreate } = require("../validators/jobApply");

const tutorJobApplyRouter = express.Router();

tutorJobApplyRouter.post('/',
    // isLoggedIn,
    runValidation,
    validatorTutorJobApplyCreate,
    handelTutorJobApplyCreate)

tutorJobApplyRouter.get('/',
    // isLoggedIn,
    handelGetTutorJobApply)

tutorJobApplyRouter.get("/:id([0-9a-fA-F]{24})",
    // isLoggedIn,
    handelGetSingleTutorJobApply)

tutorJobApplyRouter.put("/:id([0-9a-fA-F]{24})",
    // isLoggedIn,
    handelUpdateTutorJobApply)

tutorJobApplyRouter.put("/manage-job-apply/:id([0-9a-fA-F]{24})",
    // isLoggedIn,
    // isAdmin,
    handelManageJobApplyApproveAndPendingById
);

tutorJobApplyRouter.delete("/:id([0-9a-fA-F]{24})",
    // isLoggedIn,
    handelDeleteTutorJobApply)


module.exports = tutorJobApplyRouter;