const express = require("express");
const authRouter = express.Router();
const runValidation = require("../validators");

const {
    handleLogin,

} = require("../controllers/authController");

// const { isLoggedIn } = require("../middlewares/auth");
const { validatorUserLogin } = require("../validators/auth");

authRouter.post(
    "/login",
    // validatorUserLogin,
    // runValidation,
    // isLoggedOut,
    handleLogin)


module.exports = authRouter; 