const express = require("express");
const {
    handelGetUsers,
    handelGetUserById,
    handelDeleteUserById,
} = require("../controllers/userControllers");

const userRouter = express.Router();

userRouter.get('/', handelGetUsers);
userRouter.get('/:id([0-9a-fA-F]{24})', handelGetUserById);
userRouter.delete('/:id([0-9a-fA-F]{24})', handelDeleteUserById);


module.exports = userRouter;