const express = require("express");
const { handelGetUsers, handelGetUserById } = require("../controllers/userControllers");

const userRouter = express.Router();

userRouter.get('/', handelGetUsers);



module.exports = userRouter;