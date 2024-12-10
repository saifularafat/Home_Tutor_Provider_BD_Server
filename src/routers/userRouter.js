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
const { isLoggedIn, isLoggedOut } = require("../middlewares/auth");

const userRouter = express.Router();

userRouter.post("/process-register",
    userImageUpload.single("image"),
    isLoggedOut,
    validatorUserRegistration,
    runValidation,
    handelProcessRegister);
userRouter.post("/activate", handelActivateUsersAccount);

userRouter.get('/',
    isLoggedIn,
    handelGetUsers);
userRouter.get('/:id([0-9a-fA-F]{24})',
    isLoggedIn,
    handelGetUserById);
    
userRouter.delete('/:id([0-9a-fA-F]{24})',
    isLoggedIn,
    handelDeleteUserById);

userRouter.put("/:id([0-9a-fA-F]{24})",
    userImageUpload.single("image"),
    isLoggedIn,
    handelUpdateUserByID
);


module.exports = userRouter;