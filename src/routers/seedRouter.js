const express = require("express");
const {
    seedUser,
    seedTuitionJob,
    seedBlogs
} = require("../controllers/seedControllers");

const seedRouter = express.Router();

seedRouter.get("/users",
    // userImageUpload.single("image"), 
    seedUser
)

seedRouter.get("/tuition-job",
    seedTuitionJob
)

seedRouter.get("/blogs",
    seedBlogs
)

module.exports = seedRouter;