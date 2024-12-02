const express = require("express");
const { seedUser } = require("../controllers/seedControllers");

const seedRouter = express.Router();

seedRouter.get("/users", 
    // userImageUpload.single("image"), 
    seedUser
)

// seedRouter.get("/products", 
//     productImageUpload.single("image"), 
//     seedProducts
// )

module.exports = seedRouter;