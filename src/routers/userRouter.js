const express = require("express");
const { handelGetUsers } = require("../controllers/userControllers");

const userRouter = express.Router();

userRouter.get('/', handelGetUsers);

module.exports = userRouter;