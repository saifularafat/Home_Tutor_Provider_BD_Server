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
    handelUpdateTuitionJob,
    handelDeleteTuitionJob,
} = require("../controllers/tuitionJobController");
const { validatorTuitionJobCreate } = require("../validators/tuition");

const tuitionJobRouter = express.Router();

tuitionJobRouter.post("/",
    validatorTuitionJobCreate,
    runValidation,
    // isLoggedIn,
    handelTuitionJobCreate
);
//  ~ All tuition Jobs
tuitionJobRouter.get("/",
    handelGetsTuitionJob
);

//  ^ single tuition Job
tuitionJobRouter.get("/:id([0-9a-fA-F]{24})",
    handelGetSingleTuitionJob
);

//  & update Category
tuitionJobRouter.put("/:id([0-9a-fA-F]{24})",
    // runValidation,
    isLoggedIn,
    // isAdmin,
    handelUpdateTuitionJob
);

//  * Delete Category
tuitionJobRouter.delete("/:id([0-9a-fA-F]{24})",
    // isLoggedIn,
    // isAdmin,
    handelDeleteTuitionJob
);
module.exports = tuitionJobRouter;