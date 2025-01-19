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
    handelGetSingleTutorRequest,
    handelManageTutorHireApproveAndPendingById,
} = require("../controllers/hireTutorRequestController");
const { validatorTutorRequestCreate, validatorHireTutorRequestCreate } = require("../validators/hireTutorRequest");

const hireTutorRequestRouter = express.Router();

hireTutorRequestRouter.post('/',
    runValidation,
    validatorHireTutorRequestCreate,
    handelTutorRequestCreate)

hireTutorRequestRouter.get('/',
    handelGetTutorRequest)

hireTutorRequestRouter.get("/:id([0-9a-fA-F]{24})",
    handelGetSingleTutorRequest)

hireTutorRequestRouter.put("/:id([0-9a-fA-F]{24})",
    handelUpdateTutorRequest)

hireTutorRequestRouter.put("/manage-tutor-hire/:id([0-9a-fA-F]{24})",
    // isLoggedIn,
    // isAdmin,
    handelManageTutorHireApproveAndPendingById
);
hireTutorRequestRouter.delete("/:id([0-9a-fA-F]{24})",
    handelDeleteTutorRequest)


module.exports = hireTutorRequestRouter;