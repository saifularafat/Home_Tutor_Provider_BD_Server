const express = require("express");
const {
    seedUser,
    seedTuitionJob,
    seedTutorRequest,
    seedBlogs,
    seedRating,
    seedTutorJobApply,
} = require("../controllers/seedControllers");

const seedRouter = express.Router();

seedRouter.get("/users",
    // userImageUpload.single("image"), 
    seedUser
)

seedRouter.get("/tuition-job",
    seedTuitionJob
)

seedRouter.get("/tutor-request",
    seedTutorRequest
)

seedRouter.get("/job-apply",
    seedTutorJobApply
)

seedRouter.get("/blogs",
    seedBlogs
)

seedRouter.get("/ratings",
    seedRating
)

module.exports = seedRouter;