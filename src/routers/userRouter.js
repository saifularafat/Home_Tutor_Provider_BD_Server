const express = require("express");
const {
    handelProcessRegister,
    handelGetUsers,
    handelGetUserById,
    handelDeleteUserById,
    handelActivateUsersAccount,
} = require("../controllers/userControllers");
const upload = require("../middlewares/uploadFile");
const { validatorUserRegistration } = require("../validators/auth");
const runValidation = require("../validators");

const userRouter = express.Router();

userRouter.post("/process-register",
    upload.fields(['image', 'nidBirth']),
    validatorUserRegistration,
    runValidation,
    handelProcessRegister);

userRouter.post("/activate", handelActivateUsersAccount);

userRouter.get('/', handelGetUsers);
userRouter.get('/:id([0-9a-fA-F]{24})', handelGetUserById);
userRouter.delete('/:id([0-9a-fA-F]{24})', handelDeleteUserById);


module.exports = userRouter;