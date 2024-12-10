const express = require("express");
const authRouter = express.Router();
const runValidation = require("../validators");

const {
    handleLogin,
    handleLogout,

} = require("../controllers/authController");

const { validatorUserLogin } = require("../validators/auth");
const { isLoggedIn } = require("../middlewares/auth");

authRouter.post(
    "/login",
    validatorUserLogin,
    runValidation,
    // isLoggedOut,
    handleLogin)

    authRouter.post(
        "/logout",
        isLoggedIn,
        handleLogout)


module.exports = authRouter; 