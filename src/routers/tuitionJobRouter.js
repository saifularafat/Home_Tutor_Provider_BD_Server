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
    handelTuitionJobCreate
);
//  ~ All tuition Jobs
tuitionJobRouter.get("/",
    handelGetsTuitionJob
);

//  ^ single tuition Job
tuitionJobRouter.get("/:id",
    handelGetSingleTuitionJob
);

//  & update Category
tuitionJobRouter.put("/:id",
    // runValidation,
    // isLoggedIn,
    // isAdmin,
    handelUpdateTuitionJob
);

//  * Delete Category
tuitionJobRouter.delete("/:id",
    // isLoggedIn,
    // isAdmin,
    handelDeleteTuitionJob
);
module.exports = tuitionJobRouter;