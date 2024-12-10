const express = require("express");
const {
    handelProcessRegister,
    handelGetUsers,
    handelGetUserById,
    handelDeleteUserById,
    handelActivateUsersAccount,
    handelUpdateUserByID,
    handelManageUserBanAndUnBanById,
    handelUpdatePassword,
} = require("../controllers/userControllers");

const { userImageUpload } = require("../middlewares/uploadFile");
const {
    validatorUserRegistration,
    validatorUserUpdatePassword,
} = require("../validators/auth");
const runValidation = require("../validators");
const {
    isLoggedIn,
    isLoggedOut,
    isAdmin,
} = require("../middlewares/auth");

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
    isAdmin,
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
userRouter.put("/manage-user/:id([0-9a-fA-F]{24})",
    isLoggedIn,
    isAdmin,
    handelManageUserBanAndUnBanById
);

// password
userRouter.put("/update-password/:id([0-9a-fA-F]{24})",
    validatorUserUpdatePassword,
    runValidation,
    isLoggedIn,
    handelUpdatePassword
);


module.exports = userRouter;