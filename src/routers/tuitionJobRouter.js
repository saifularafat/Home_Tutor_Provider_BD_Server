const express = require("express");

const runValidation = require("../validators");
const {
    isLoggedIn,
    isLoggedOut,
    isAdmin,
} = require("../middlewares/auth");
const { handelTuitionJobCreate } = require("../controllers/tuitionJobController");

const tuitionJobRouter = express.Router();

tuitionJobRouter.post("/",
    // validatorUserRegistration,
    // runValidation,
    handelTuitionJobCreate
);

module.exports = tuitionJobRouter;