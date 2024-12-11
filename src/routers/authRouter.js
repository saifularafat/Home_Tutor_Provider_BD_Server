const express = require("express");
const authRouter = express.Router();
const runValidation = require("../validators");

const {
    handleLogin,
    handleLogout,
    handleRefreshToken,

} = require("../controllers/authController");

const { validatorUserLogin } = require("../validators/auth");
const { isLoggedIn, isLoggedOut } = require("../middlewares/auth");

authRouter.post(
    "/login",
    validatorUserLogin,
    runValidation,
    isLoggedOut,
    handleLogin)

authRouter.post(
    "/logout",
    isLoggedIn,
    handleLogout)

authRouter.get(
    "/refresh-token",
    handleRefreshToken)


module.exports = authRouter; 