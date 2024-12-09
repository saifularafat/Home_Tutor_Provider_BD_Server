const express = require("express");
const {
    handelProcessRegister,
    handelGetUsers,
    handelGetUserById,
    handelDeleteUserById,
    handelActivateUsersAccount,
    handelUpdateUserByID,
} = require("../controllers/userControllers");
const { userImageUpload } = require("../middlewares/uploadFile");
const { validatorUserRegistration } = require("../validators/auth");
const runValidation = require("../validators");

const userRouter = express.Router();

userRouter.post("/process-register",
    userImageUpload.single("image"),
    validatorUserRegistration,
    runValidation,
    handelProcessRegister);

userRouter.post("/activate", handelActivateUsersAccount);

userRouter.get('/', handelGetUsers);
userRouter.get('/:id([0-9a-fA-F]{24})', handelGetUserById);
userRouter.delete('/:id([0-9a-fA-F]{24})', handelDeleteUserById);

userRouter.put("/:id([0-9a-fA-F]{24})",
    userImageUpload.single("image"),
    handelUpdateUserByID
);


module.exports = userRouter;