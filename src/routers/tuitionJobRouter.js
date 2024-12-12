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
    handelGetSingleTuitionJob,
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

//  ^ single product
tuitionJobRouter.get("/:slug",
    handelGetSingleTuitionJob
);

module.exports = tuitionJobRouter;