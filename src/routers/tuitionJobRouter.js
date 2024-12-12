const express = require("express");

const runValidation = require("../validators");
const {
    isLoggedIn,
    isLoggedOut,
    isAdmin,
} = require("../middlewares/auth");
const {
    handelTuitionJobCreate,
    handelGetsTuitionJob,
} = require("../controllers/tuitionJobController");

const tuitionJobRouter = express.Router();

tuitionJobRouter.post("/",
    // validatorUserRegistration,
    // runValidation,
    handelTuitionJobCreate
);

tuitionJobRouter.get("/",
    handelGetsTuitionJob
);

module.exports = tuitionJobRouter;