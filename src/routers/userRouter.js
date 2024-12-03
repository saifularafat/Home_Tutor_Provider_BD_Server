const express = require("express");
const { handelGetUsers, handelGetUserById } = require("../controllers/userControllers");

const userRouter = express.Router();

userRouter.get('/', handelGetUsers);
userRouter.get('/:id([0-9a-fA-F]{24})', handelGetUserById);


module.exports = userRouter;