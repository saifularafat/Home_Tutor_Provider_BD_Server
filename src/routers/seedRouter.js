const express = require("express");
const { seedUser, seedTuitionJob } = require("../controllers/seedControllers");

const seedRouter = express.Router();

seedRouter.get("/users", 
    // userImageUpload.single("image"), 
    seedUser
)

seedRouter.get("/tuition-job", 
    seedTuitionJob
)

module.exports = seedRouter;